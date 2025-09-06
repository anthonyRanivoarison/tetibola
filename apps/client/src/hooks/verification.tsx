import {useState} from "react";
import {api} from "../api/base";

export const useVerification = (length: number = 6) => {
  const [verificationCode, setVerificationCode] = useState(Array(length).fill(""));

  const code = verificationCode.join("");

  const handleVerify = async (url: string, extraData: object = {}) => {
    try {
      const res = await api.post(url, {clientCode: code, ...extraData});
      return res.data;
    } catch (e) {
      throw e;
    }
  };

  return {verificationCode, setVerificationCode, handleVerify};
};
