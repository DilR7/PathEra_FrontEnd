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
      <AlertDialogContent className="max-w-3xl h-[24rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Select Your Job Title
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex justify-center gap-8">
          <div
            className="flex flex-col gap-4 cursor-pointer"
            onClick={() => onSelectJob("Data Science")}
          >
            <div className="w-72 h-48 transform transition-transform duration-300 hover:scale-110">
              <img src={DataScienceIcon} className="w-full h-full rounded-lg" />
            </div>
            <p className="text-center text-2xl text-black">Data Science</p>
          </div>
          <div className="flex flex-col gap-4 cursor-pointer">
            <div className="w-72 h-48 transform transition-transform duration-300 hover:scale-110">
              <img
                src={SoftwareEngineeringIcon}
                className="w-full h-full rounded-lg grayscale"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-center text-2xl text-black">
                Software Engineer
              </p>
              <p className="text-center text-lg text-gray-400">Coming Soon</p>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default JobSelectionModal;
