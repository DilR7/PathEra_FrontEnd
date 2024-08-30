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

const InterviewSimulation = () => {
  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const { isRecording, audio, remainingTime, startRecording, stopRecording } =
    useMicrophone(60);

  useEffect(() => {
    const savedJobTitle = localStorage.getItem("selectedJobTitle");
    if (savedJobTitle) {
      setJobTitle(savedJobTitle);
      fetchQuestions(savedJobTitle);
    } else {
      setOpen(true);
    }
  }, []);

  const handleSelectJob = (title: string) => {
    if (title === jobTitle) {
      setOpen(false);
      return;
    }
    setJobTitle(title);
    setOpen(false);
    localStorage.setItem("selectedJobTitle", title);
    fetchQuestions(title);
  };

  const fetchQuestions = async (title: string) => {
    try {
      setQuestions(null);
      setLoadingQuestions(true);
      const response = await axios.get(`${BASE_URL}/questions/${title}`);
      setQuestions(response.data);
      setCurrentQuestion(0);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoadingQuestions(false);
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
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 py-8 border border-primary rounded-xl shadow-custom-blue min-h-96">
          <Progress
            value={(currentQuestion + 1) * 10}
            className="bg-gray-200 h-3 md:h-4 lg:h-5"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-start max-w-full">
              {questions && questions[currentQuestion] && (
                <div className="flex flex-grow items-start">
                  <img
                    src={InterviewerIcon}
                    className="w-8 h-full md:w-10 md:h-10 lg:w-12 lg:h-12"
                  />
                  <div className="ml-4 bg-gray-100 p-3 md:p-4 rounded-lg">
                    <p className="text-sm md:text-lg">
                      {questions[currentQuestion].question}
                    </p>
                  </div>
                </div>
              )}
              {loadingQuestions && (
                <div className="flex flex-grow items-start">
                  <Skeleton className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full" />
                  <Skeleton className="ml-4 w-full h-4 md:h-5 lg:h-6" />
                </div>
              )}
            </div>
            <div className="flex justify-end w-full">
              {audio && (
                <div className="bg-blue-100 flex flex-col gap-2 md:p-4 rounded-lg w-5/6 md:w-[300px]">
                  <audio controls src={audio} className="w-full" />
                  <Button className="mt-2 px-4 py-2 bg-primary text-white rounded-md transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none">
                    Finalize Answer
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-auto">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="p-4 md:p-6 bg-primary text-white rounded-full hover:bg-primary-dark active:scale-90 focus:outline-none transition-transform duration-200 ease-in-out"
            >
              {isRecording ? `${remainingTime}s` : <Mic size={28} />}
            </button>
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
