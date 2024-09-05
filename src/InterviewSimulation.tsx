import { useState, useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import JobSelectionModal from "./components/JobSelectionModal";
import { Progress } from "./components/ui/progress";
import { BASE_URL } from "./config/settings";
import { useUser } from "./context/UserContext";
import axios from "axios";
import { QuestionType } from "./types/QuestionType";
import InterviewerIcon from "./assets/InterviewerIcon.png";
import { Mic } from "lucide-react";
import { useMicrophone } from "./hooks/useMicrophone";
import { Button } from "./components/ui/button";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useToaster } from "./context/ToastContext";
import { FLASK_URL } from "./config/settings";
import QuestionDisplay from "./components/QuestionDisplay";
import SpeechEngine from "./components/SpeechEngine";
import LoadingButton from "./components/ui/loading-button";
import { useNavigate } from "react-router-dom";

const InterviewSimulation: React.FC = () => {
  const [user] = useUser();
  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAudioVisible, setIsAudioVisible] = useState(false);
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);

  const {
    isRecording,
    audio,
    remainingTime,
    startRecording,
    stopRecording,
    resetRecording,
  } = useMicrophone(60);
  const { toastError } = useToaster();

  useSmoothScroll();

  useEffect(() => {
    const savedJobTitle = localStorage.getItem("selectedJobTitle");
    const cachedQuestions = sessionStorage.getItem("questions");

    if (savedJobTitle) {
      setJobTitle(savedJobTitle);

      if (cachedQuestions) {
        setQuestions(JSON.parse(cachedQuestions));
        setLoadingQuestions(false);
      } else {
        fetchQuestions(savedJobTitle);
      }
    } else {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (audio) {
      setIsAudioVisible(true);
      transcribeAudio(audio);
    }
  }, [audio]);

  const handleSelectJob = (title: string) => {
    if (title !== jobTitle) {
      setJobTitle(title);
      localStorage.setItem("selectedJobTitle", title);
      fetchQuestions(title);
    }
    setOpen(false);
  };

  const fetchQuestions = async (title: string) => {
    setLoadingQuestions(true);
    try {
      const response = await axios.get(`${BASE_URL}/questions/${title}`);
      setQuestions(response.data);
      sessionStorage.setItem("questions", JSON.stringify(response.data));
      setCurrentQuestion(0);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const transcribeAudio = async (blobUrl: string) => {
    setLoadingTranscription(true);
    try {
      const blob = await fetch(blobUrl).then((r) => r.blob());
      const base64data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result as string);
      });

      const response = await axios.post(`${BASE_URL}/transcribe`, {
        audioData: base64data,
      });
      const transcriptionText = response.data.text;

      if (transcriptionText) {
        setTranscription(transcriptionText.trim());
        console.log("Transcription:", transcriptionText);
      } else {
        toastError("Transcription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during transcription:", error);
      toastError("Error during transcription. Please try again.");
    } finally {
      setLoadingTranscription(false);
      setIsAudioVisible(false);
    }
  };

  const onReRecord = () => {
    setTranscription(null);
    resetRecording();
    startRecording();
  };

  const onFinalize = async () => {
    if (!questions) return;
    try {
      setLoading(true);
      const response = await axios.post(`${FLASK_URL}/evaluate`, {
        question_id: questions[currentQuestion].id,
        user_answer: transcription,
      });
      console.log("Response:", response.data);
      setCurrentScore(response.data.score);
      setAnswers((prev) => [...prev, transcription || "No answer"]);
      setScores((prev) => [...prev, response.data.score]);
    } catch (error) {
      console.error("Error submitting answer:", error);
      toastError("Failed to submit answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (questions && currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTranscription(null);
      setCurrentScore(null);
      setShowScore(false);
      setIsAudioVisible(false);
      resetRecording();
    }
  };

  useEffect(() => {
    if (currentScore !== null) {
      setShowScore(true);
      setTimeout(() => {
        setScoreVisible(true);
      }, 10);
    } else {
      setScoreVisible(false);
      setTimeout(() => {
        setShowScore(false);
      }, 300);
    }
  }, [currentScore]);

  const onSubmission = async () => {
    if (!user) return;
    try {
      setIsSubmitting(true);
      console.log(questions?.map((q) => q.sample_answer));
      console.log(answers, scores);
      const response = await axios.post(`${BASE_URL}/save-session`, {
        userId: user.id,
        jobTitle,
        answers,
        scores,
        questions: questions?.map((q) => ({
          id: q.id,
        })),
        sample_answers: questions?.map((q) => q.sample_answer),
      });
      if (response.status === 200) {
        sessionStorage.removeItem("questions");
        localStorage.removeItem("selectedJobTitle");
        navigate(`/results/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      toastError("Failed to submit answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="py-6 px-4 md:px-12 lg:px-24">
        {jobTitle && (
          <p className="text-xl md:text-2xl font-bold">
            {jobTitle}{" "}
            <span
              className="text-primary text-sm font-medium cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Change
            </span>
          </p>
        )}
        <br />
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 py-8 border border-primary rounded-xl shadow-custom-blue">
          <Progress
            value={((currentQuestion + 1) / (questions?.length || 1)) * 100}
            className="bg-gray-200 h-3 md:h-4 lg:h-5"
          />
          <div className="flex flex-col gap-4">
            <QuestionDisplay
              question={questions ? questions[currentQuestion] : undefined}
              loading={loadingQuestions}
            />
            <div className="flex justify-end w-full">
              <SpeechEngine
                audio={audio}
                transcription={transcription}
                setTranscription={setTranscription}
                isAudioVisible={isAudioVisible}
                loadingTranscription={loadingTranscription}
                onReRecord={onReRecord}
                onFinalize={onFinalize}
                startRecording={startRecording}
                resetRecording={resetRecording}
                loading={loading}
                showScore={showScore}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start w-full md:max-w-[80%]">
              {showScore && (
                <div
                  className={`flex flex-grow items-start transition-all duration-300 ease-out transform ${
                    scoreVisible
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-0"
                  }`}
                >
                  <img
                    src={InterviewerIcon}
                    className="w-8 md:w-10 lg:w-12"
                    alt="Interviewer"
                  />
                  <div className="ml-4 bg-gray-100 p-3 md:p-4 rounded-lg flex flex-col">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm md:text-lg">
                        Your answer scored {currentScore} points.
                      </p>
                      <p className="text-sm md:text-xl font-bold mt-2">
                        Sample Answer
                      </p>
                      <p className="text-sm md:text-lg">
                        {questions && questions[currentQuestion].sample_answer}
                      </p>
                    </div>
                    {currentQuestion < questions!.length - 1 ? (
                      <div className="flex justify-end mt-4">
                        <Button
                          className="px-4 py-2 bg-primary text-white rounded-md shadow-md focus:outline-none"
                          onClick={handleNextQuestion}
                        >
                          Next Question
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end mt-4">
                        {!isSubmitting ? (
                          <Button
                            className="px-4 py-2 bg-primary text-white rounded-md shadow-md focus:outline-none"
                            onClick={() => onSubmission()}
                          >
                            Submit Answers
                          </Button>
                        ) : (
                          <LoadingButton className="px-4 py-2 bg-primary text-white rounded-md active:scale-95 shadow-md focus:outline-none" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-auto">
            {transcription === null && !loadingTranscription && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="p-4 md:p-6 bg-primary text-white rounded-full hover:bg-primary-dark active:scale-90 focus:outline-none transition-transform duration-200 ease-in-out"
              >
                {isRecording ? `${remainingTime}s` : <Mic size={28} />}
              </button>
            )}
          </div>
        </div>
      </div>
      <JobSelectionModal
        open={open}
        setOpen={setOpen}
        onSelectJob={handleSelectJob}
      />
      <br />
      <br />
    </MainLayout>
  );
};

export default InterviewSimulation;
