import React from "react";

interface StatisticsCardProps {
  title: string;
  value: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value }) => {
  return (
    <div className="flex justify-center flex-col text-center py-4 md:py-0">
      <p className="font-medium text-l">{title}</p>
      <p className="font-bold text-xl">{value}</p>
    </div>
  );
};

export default StatisticsCard;
