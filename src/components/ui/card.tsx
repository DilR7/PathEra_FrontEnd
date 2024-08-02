import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string;
  color: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  company: string;
  role: string;
  imageSrc: string;
  tags: string[];
  color: string;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  rate: string;
  location: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border bg-card text-card-foreground shadow-sm max-w-sm mx-auto p-3 rounded-lg",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ date, color, className, ...props }, ref) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistClick = () => {
      setIsWishlisted((prevState) => !prevState);
    };
    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-between items-center p-4 rounded-t-lg",
          className,
          color
        )}
        {...props}
      >
        <span className="text-xs font-medium text-black border-2 bg-white rounded-3xl border-transparent p-2 px-5">
          {date}
        </span>
        <button
          onClick={handleWishlistClick}
          style={{ fontSize: "2rem" }}
          className={`text-xl ${isWishlisted ? "text-red-500" : "text-gray-600"}`}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ company, role, imageSrc, tags, color, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(" px-4 pb-4 rounded-b-lg", className, color)}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold">{company}</span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold w-3/4">{role}</h4>
          <img
            src={imageSrc}
            className="w-12 h-12 rounded-full border-transparent bg-white p-2"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="border border-black px-3 py-1 rounded-full text-gray-800 hover:bg-white duration-150 ease-out"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ rate, location, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex justify-between items-center mt-4", className)}
      {...props}
    >
      <div className="flex justify-center text-start flex-col">
        <span className="text-sm font-bold">{rate}</span>
        <span className="text-sm text-gray-600">{location}</span>
      </div>
      <button className="bg-black text-white px-4 py-2 rounded-full">
        Details
      </button>
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardContent };
