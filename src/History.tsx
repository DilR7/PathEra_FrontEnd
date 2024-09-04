import MainLayout from "./layout/MainLayout";
import { BASE_URL } from "./config/settings";
import { useEffect, useState } from "react";
import axios from "axios";
import { PracticeSessionType } from "./types/PracticeSessionTypes";
import { formatPostDate } from "./lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getScoreColor } from "./lib/utils";

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
                  className="group flex justify-between border-b border-gray-300 py-4 md:py-6 pl-4 cursor-pointer transition-all duration-500 ease-in-out hover:pr-6 hover:pl-6 hover:text-primary hover:border-primary hover:border-b-2"
                >
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {session.job_title}
                  </p>
                  <div className="flex gap-2 items-center md:gap-4">
                    <p
                      className={`font-bold text-md md:text-lg lg:text-xl ${getScoreColor(
                        session.average_score
                      )}`}
                    >
                      {Number(session.average_score).toFixed(2)}%
                    </p>
                    <p className="text-md md:text-lg lg:text-xl">
                      {formatPostDate(session.createdAt)}
                    </p>
                    <ArrowUpRight
                      className="text-primary transform opacity-0 -translate-x-[150%] translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      size={24}
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
