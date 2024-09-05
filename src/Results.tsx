import MainLayout from "./layout/MainLayout";
import { useParams } from "react-router-dom";
import { Skeleton } from "./components/ui/skeleton";
import useSmoothScroll from "./hooks/useSmoothScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./config/settings";
import {
  AnswerDetailsType,
  PracticeSessionType,
} from "./types/PracticeSessionTypes";
import { useToaster } from "./context/ToastContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { getScoreColor } from "./lib/utils";

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<PracticeSessionType | null>(null);
  const [answers, setAnswers] = useState<AnswerDetailsType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toastError } = useToaster();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-session/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setSession({
            id: response.data.id,
            user_id: response.data.userId,
            job_title: response.data.jobTitle,
            average_score: response.data.averageScore,
            createdAt: response.data.createdAt,
          });
          setAnswers(response.data.answers);
        }
        console.log(response.data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toastError("Session not found");
        } else if (error.response.status === 403) {
          navigate("/");
          toastError("Unauthorized");
        } else {
          toastError("An error occurred. Please try again later");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useSmoothScroll();

  return (
    <MainLayout>
      <br />
      <br />
      <div className="py-6 px-4 md:px-12 lg:px-24">
        <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-12 py-8 border border-primary rounded-xl shadow-custom-blue">
          {session && (
            <p className="text-center md:text-start text-xl md:text-2xl font-bold px-8">
              {`${session?.job_title} Interview Results`}
            </p>
          )}

          {loading ? (
            <div className="w-full px-4 md:px-6 lg:px-8">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="w-full px-4 md:px-6 lg:px-8"
            >
              <AccordionItem value="item-0" className="px-0 md:px-4">
                <AccordionTrigger className="flex justify-between gap-2">
                  <p className="text-lg md:text-xl text-primary font-bold">
                    Questions
                  </p>
                  <p className="text-lg md:text-xl text-primary font-bold">
                    Score
                  </p>
                </AccordionTrigger>
              </AccordionItem>
              {answers &&
                answers.map((answer, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    className="px-0 md:px-4"
                    key={index}
                  >
                    <AccordionTrigger className="flex justify-between gap-4">
                      <p className="text-sm md:text-lg text-start">
                        {`${index + 1}. ${answer.question}`}
                      </p>
                      <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
                        <p
                          className={`text-sm md:text-lg lg:text-xl font-bold ${getScoreColor(
                            answer.score
                          )}`}
                        >
                          {`${answer.score}%`}
                        </p>
                        <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-1 md:px-4 lg:px-8">
                      <p className="font-bold text-sm sm:text-lg md:text-xl">
                        Your answer
                      </p>
                      <p className="mt-1 sm:mt-2">{answer.answer}</p>
                      <p className="font-bold text-sm sm:text-lg md:text-xl mt-4">
                        Sample Answer
                      </p>
                      <p className="mt-2">{answer.sampleAnswer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          )}
          <div className="flex w-full justify-center">
            <Button
              className="w-48 transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none"
              onClick={() => navigate("/interview")}
            >
              Practice Again
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Results;
