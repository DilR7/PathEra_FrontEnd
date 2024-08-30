import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AiFillCloseCircle } from "react-icons/ai"; // Example icon for error

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast
          key={id}
          {...props}
          className="flex items-center border border-gray-200 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-center bg-red-500 text-white h-full p-2 rounded-full">
            <AiFillCloseCircle size={24} />
          </div>
          <div className="grid gap-1 p-3">
            {title && <ToastTitle className="font-bold">{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose className="ml-auto mr-2 text-gray-500 hover:text-gray-700">
            <AiFillCloseCircle size={20} />
          </ToastClose>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
