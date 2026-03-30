import { TriangleAlertIcon } from "lucide-react";

export const ErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center text-sm text-red-400">
      <TriangleAlertIcon className="mr-1" />
      <span>{message}</span>
    </div>
  );
};
