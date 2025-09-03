import React from "react";
import clsx from "clsx";
import {CheckCircle, AlertTriangle, Info, XCircle} from "lucide-react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  content: string;
}

export const Alert: React.FC<AlertProps> = ({
                                              type = "info",
                                              title,
                                              content,
                                            }) => {
  const styles = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600"/>,
    error: <XCircle className="w-5 h-5 text-red-600"/>,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-600"/>,
    info: <Info className="w-5 h-5 text-blue-600"/>,
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-3 p-4 rounded-lg border shadow-sm",
        styles[type]
      )}
    >
      {icons[type]}
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
