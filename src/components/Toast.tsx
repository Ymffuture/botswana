import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md text-white animate-slide-in 
      ${type === "success" ? "bg-green-600" : "bg-red-500"}`}
    >
      {type === "success" ? "✅" : "❌"} {message}
    </div>
  );
}
 
