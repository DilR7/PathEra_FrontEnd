import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DataScienceIcon from "../assets/DataScience.png";
import SoftwareEngineeringIcon from "../assets/SoftwareEngineer.png";

interface JobSelectionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectJob: (title: string) => void;
}

const JobSelectionModal: React.FC<JobSelectionModalProps> = ({
  open,
  setOpen,
  onSelectJob,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-full sm:max-w-3xl h-auto p-4 sm:p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl sm:text-2xl text-center">
            Select Your Job Title
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 sm:mt-8">
          <div
            className="flex flex-col gap-2 sm:gap-4 cursor-pointer items-center w-[45%]"
            onClick={() => onSelectJob("Data Science")}
          >
            <div className="w-full h-32 sm:h-48 transform transition-transform duration-300 hover:scale-110">
              <img
                src={DataScienceIcon}
                className="w-full h-full rounded-lg"
                alt="Data Science"
              />
            </div>
            <p className="text-center text-lg sm:text-2xl text-black">
              Data Science
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4 cursor-pointer items-center w-[45%] sm:w-1/3">
            <div className="w-full h-32 sm:h-48 transform transition-transform duration-300 hover:scale-110">
              <img
                src={SoftwareEngineeringIcon}
                className="w-full h-full rounded-lg grayscale"
                alt="Software Engineer"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-center text-lg sm:text-2xl text-black">
                Software Engineer
              </p>
              <p className="text-center text-sm sm:text-lg text-gray-400">
                Coming Soon
              </p>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default JobSelectionModal;
