import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {CheckCircle, AlertTriangle, Info, XCircle} from "lucide-react";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  title: string;
  content: string;
  type: AlertType;
}

export const Alert: React.FC<AlertProps> = ({title, content, type = "info"}) => {
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

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-4 right-4 flex items-center gap-3 p-4 rounded-lg border shadow-sm transform transition-all duration-500",
        styles[type],
        visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
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
