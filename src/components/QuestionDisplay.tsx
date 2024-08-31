import React from "react";
import InterviewerIcon from "../assets/InterviewerIcon.png";
import { Skeleton } from "./ui/skeleton";
import { QuestionType } from "../types/QuestionType";

interface QuestionDisplayProps {
  question?: QuestionType;
  loading: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  loading,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start max-w-full">
      {question ? (
        <div className="flex flex-grow items-start">
          <img
            src={InterviewerIcon}
            className="w-8 md:w-10 lg:w-12"
            alt="Interviewer"
          />
          <div className="ml-4 bg-gray-100 p-3 md:p-4 rounded-lg">
            <p className="text-sm md:text-lg">{question.question}</p>
          </div>
        </div>
      ) : (
        loading && (
          <div className="flex flex-grow items-start">
            <Skeleton className="w-8 md:w-10 lg:w-12 rounded-full" />
            <Skeleton className="ml-4 w-full h-4 md:h-5 lg:h-6" />
          </div>
        )
      )}
    </div>
  );
};

export default QuestionDisplay;
