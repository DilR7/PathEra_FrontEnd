import MainLayout from "./layout/MainLayout";
import { BASE_URL } from "./config/settings";
import { useEffect, useState } from "react";
import axios from "axios";
import { PracticeSessionType } from "./types/PracticeSessionTypes";
import { formatPostDate } from "./lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const History = () => {
  const [sessions, setSessions] = useState<PracticeSessionType[] | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setSessions(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getScoreColor = (score: number) => {
    if (score < 50) return "red";
    if (score >= 50 && score <= 80) return "#feb600";
    return "#109932";
  };

  return (
    <MainLayout>
      <br />
      <br />
      <div className="py-6 px-4 md:px-12 lg:px-24">
        <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-16 py-8 border border-primary rounded-xl shadow-custom-blue">
          <p className="text-start text-xl md:text-2xl font-bold pl-4">
            {`Interview Practice History`}
          </p>
          <div className="flex flex-col border-t border-gray-300">
            {sessions &&
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => navigate(`/results/${session.id}`)}
                  className="group flex items-center justify-between border-b border-gray-300 pl-2 py-4 md:py-6 md:pl-4 cursor-pointer transition-all duration-500 ease-in-out md:hover:pr-6 md:hover:pl-6 hover:text-primary hover:border-primary hover:border-b-2"
                >
                  <p className="text-md md:text-xl lg:text-2xl">
                    {session.job_title}
                  </p>
                  <div className="flex gap-2 items-center md:gap-4">
                    <p className="text-md md:text-lg lg:text-xl">
                      {formatPostDate(session.createdAt)}
                    </p>
                    <div className="w-8 h-8 md:w-12 md:h-12">
                      <CircularProgressbar
                        value={Number(session.average_score)}
                        text={`${Number(session.average_score).toFixed(0)}%`}
                        styles={buildStyles({
                          textSize: "30px",
                          textColor: "#000",
                          pathColor: getScoreColor(session.average_score),
                          trailColor: "#d6d6d6",
                        })}
                      />
                    </div>
                    <ArrowUpRight
                      className="hidden sm:block text-primary transform opacity-0 -translate-x-[150%] translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      size={32}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default History;
