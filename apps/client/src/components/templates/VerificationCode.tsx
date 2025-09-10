import React from "react";

interface VerificationCodeInputProps {
  code: string[];
  setCode: (code: string[]) => void;
  onVerify: () => void;
}

const VerificationCode: React.FC<VerificationCodeInputProps> = ({code, setCode, onVerify}) => {
  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Enter the 6-digit code sent to your email</p>
      <div className="flex gap-2 justify-center">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleCodeChange(e.target.value, index)}
            maxLength={1}
            className="w-10 h-10 text-center border rounded text-lg"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onVerify}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Verify Account
      </button>
    </div>
  );
};

export default VerificationCode;
