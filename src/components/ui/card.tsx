import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useJob } from "@/context/JobContextType";
import { PiDotOutlineFill } from "react-icons/pi";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  to: string;
  role: string;
  location: string;
  company: string;
  tags: string[];
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  location: string;
  role: string;
  company: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: string[];
  description: string;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  rate: string;
  postedDate: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, company, location, role, tags, ...props }, ref) => {
    const { setJobDetails } = useJob();
    const handleClick = () => {
      setJobDetails({ role, company, location, tags });
    };
    return (
      <Link to="/jobdetail" onClick={handleClick}>
        <div
          ref={ref}
          className={cn(
            "bg-white text-gray-900 shadow-sm mx-auto p-3 w-72 rounded-lg hover:shadow-lg transition-shadow duration-200",
            className
          )}
          {...props}
        />
      </Link>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ role, imageSrc, location, company, className, ...props }, ref) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistClick = () => {
      setIsWishlisted((prevState) => !prevState);
    };
    return (
      <div
        ref={ref}
        className={cn("flex justify-between items-center mb-2", className)}
        {...props}
      >
        <div className="flex items-center">
          <img
            src={imageSrc}
            alt={`${location} logo`}
            className="w-10 h-10 rounded-lg mr-2 p-2 bg-gray-100"
          />

          <div className="">
            <h4 className="text-sm font-semibold">{role}</h4>
            <div className="flex items-center">
              <span className=" text-sm text-gray-500">{company}</span>
              <span className="text-gray-500">
                <PiDotOutlineFill />
              </span>
              <span className=" text-sm text-gray-500">{location}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleWishlistClick}
          className={`text-xl ${
            isWishlisted ? "text-red-500" : "text-gray-600"
          }`}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ tags, description, className, ...props }, ref) => {
    const tagStyles = [
      { bg: "bg-purple-200", text: "text-purple-900" },
      { bg: "bg-green-200", text: "text-green-900" },
      { bg: "bg-orange-200", text: "text-orange-900" },
    ];

    return (
      <div ref={ref} className={cn("mb-4", className)} {...props}>
        <div className="flex flex-wrap gap-2 mb-2 mt-4">
          {tags.map((tag, index) => {
            const { bg, text } = tagStyles[index] || {
              bg: "bg-gray-200",
              text: "text-gray-700",
            };

            return (
              <span
                key={index}
                className={cn(
                  bg,
                  text,
                  "px-3 py-1 rounded-lg text-xs font-semibold"
                )}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <p className="text-gray-600 mt-4">{description}</p>
      </div>
    );
  }
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ rate, postedDate, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex justify-between items-center pt-2 border-t",
        className
      )}
      {...props}
    >
      <div className="flex text-lg font-semibold">
        {rate}
        <h1 className="text-gray-500 font-medium">/hr</h1>
      </div>
      <div className="text-xs text-gray-500">Posted {postedDate}</div>
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardContent };
