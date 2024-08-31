import { useState, useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import JobSelectionModal from "./components/JobSelectionModal";
import { Progress } from "./components/ui/progress";
import { BASE_URL } from "./config/settings";
import axios from "axios";
import { QuestionType } from "./types/QuestionType";
import InterviewerIcon from "./assets/InterviewerIcon.png";
import { Skeleton } from "./components/ui/skeleton";
import { Mic } from "lucide-react";
import { useMicrophone } from "./hooks/useMicrophone";
import { Button } from "./components/ui/button";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useToaster } from "./context/ToastContext";

const InterviewSimulation = () => {
  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAudioVisible, setIsAudioVisible] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
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
    savedJobTitle ? setJobTitle(savedJobTitle) : setOpen(true);
    if (savedJobTitle) fetchQuestions(savedJobTitle);
  }, []);

  useEffect(() => {
    if (audio) {
      setTimeout(() => setIsAudioVisible(true), 100);
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
      setCurrentQuestion(0);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const onFinalize = async (blobUrl: string) => {
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
        setTranscription(transcriptionText);
        console.log("Transcription:", transcriptionText);
      } else {
        toastError("Transcription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during transcription:", error);
      toastError("Error during transcription. Please try again.");
    } finally {
      setLoadingTranscription(false);
      setTimeout(() => {
        setIsAudioVisible(false);
        setAudioLoaded(false);
      }, 300);
    }
  };

  const onReRecord = () => {
    setTranscription(null);
    resetRecording();
    startRecording();
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
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 py-8 border border-primary rounded-xl shadow-custom-blue min-h-[32rem]">
          <Progress
            value={(currentQuestion + 1) * 10}
            className="bg-gray-200 h-3 md:h-4 lg:h-5"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-start max-w-full">
              {questions ? (
                <div className="flex flex-grow items-start">
                  <img
                    src={InterviewerIcon}
                    className="w-8 md:w-10 lg:w-12"
                    alt="Interviewer"
                  />
                  <div className="ml-4 bg-gray-100 p-3 md:p-4 rounded-lg">
                    <p className="text-sm md:text-lg">
                      {questions[currentQuestion].question}
                    </p>
                  </div>
                </div>
              ) : (
                loadingQuestions && (
                  <div className="flex flex-grow items-start">
                    <Skeleton className="w-8 md:w-10 lg:w-12 rounded-full" />
                    <Skeleton className="ml-4 w-full h-4 md:h-5 lg:h-6" />
                  </div>
                )
              )}
            </div>
            <div className="flex justify-end w-full">
              <div
                className={`transition-all duration-300 ease-out transform ${
                  isAudioVisible || transcription
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                } bg-blue-100 flex flex-col gap-2 p-4 rounded-lg ${
                  transcription ? "w-[40%]" : "md:w-[300px]"
                }`}
              >
                {!transcription && audio && (
                  <>
                    <audio
                      controls
                      src={audio}
                      className="w-full"
                      onCanPlayThrough={() => setAudioLoaded(true)}
                    />
                    <Button
                      onClick={() => onFinalize(audio)}
                      className="mt-2 px-4 py-2 bg-primary text-white rounded-md transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none"
                      disabled={!audioLoaded || loadingTranscription}
                    >
                      {loadingTranscription ? "Loading" : "Finalize Answer"}
                    </Button>
                  </>
                )}
                {transcription && (
                  <div className="bg-blue-100 rounded-lg">
                    <p className="text-sm md:text-lg">{transcription}</p>
                    <Button
                      onClick={onReRecord}
                      className="mt-2 px-4 py-2 bg-primary text-white rounded-md transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none"
                    >
                      Re-record
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-auto">
            {!transcription && !loadingTranscription && (
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
    </MainLayout>
  );
};

export default InterviewSimulation;
