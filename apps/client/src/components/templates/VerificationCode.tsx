import React, {useRef} from "react";

type Props = {
  code: string[];
  setCode: (code: string[]) => void;
  onVerify: () => void;
};

const VerificationCode: React.FC<Props> = ({code, setCode, onVerify}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every((c) => c.length === 1)) {
      onVerify();
    }
  };

  return (
    <div className="flex gap-2">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => inputsRef.current[index] = el}
          type="text"
          value={digit}
          onChange={(e) => handleCodeChange(e.target.value, index)}
          maxLength={1}
          className="w-10 h-10 text-center border rounded text-lg border-gray-400 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default VerificationCode;
