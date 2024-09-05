import { Skeleton } from "./ui/skeleton";

const JobSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-4 w-full bg-white flex flex-col gap-2 justify-between">
      <div className="flex flex-col">
        <div className="flex items-start mb-2 gap-3">
          <Skeleton className="w-12 h-12" />
          <div className="w-0 flex-1">
            <Skeleton className="h-6 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        <div className="flex justify-start mb-2">
          <Skeleton className="h-6 w-1/3" />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

export default JobSkeleton;
