import { Button } from "./button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingButton = ({
  className = "",
  text = "Loading...",
}: {
  className?: string;
  text?: string;
}) => {
  return (
    <Button className={"flex gap-2 items-center " + className}>
      <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
      {text}
    </Button>
  );
};

export default LoadingButton;
