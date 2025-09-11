import React, {useEffect} from "react";
import toast from "react-hot-toast";
import {api} from "../../api/base";

const ExpenseAlert: React.FC = () => {
  useEffect(() => {
    const checkAlert = async () => {
      try {
        const res = await api.get("../summary/alert", {withCredentials: true});
        const message = res.data?.Message;

        if (message?.toLowerCase().includes("exceeded")) {
          toast.error(`${message}`, {duration: 5000});
        }
      } catch (err) {
        console.error("Error checking summary alert:", err);
      }
    };

    checkAlert();

    const interval = setInterval(checkAlert, 60000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default ExpenseAlert;
