import {Key, Mail} from "lucide-react";
import AuthInput from "../ui/AuthInput";
import React from "react";

interface InputsProps {
  data: { email: string; password: string; confirmPassword: string };
  setData: React.Dispatch<React.SetStateAction<{
    email: string; password: string; confirmPassword: string;
  }>>;
  showConfirmPassword?: boolean;
}

const AuthInputs = ({data, setData, showConfirmPassword = true}: InputsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]: value}));
  };

  return (
    <div className="inputs flex flex-col gap-4">
      <AuthInput
        label="Email"
        name="email"
        type="email"
        value={data.email ?? ""}
        onChange={handleChange}
        Icon={Mail}
        placeholder="•••••••••••••••••"
      />
      <AuthInput
        label="Password"
        name="password"
        type="password"
        value={data.password ?? ""}
        onChange={handleChange}
        Icon={Key}
        placeholder="•••••••••••••••••"
      />
      {showConfirmPassword && (
        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={data?.confirmPassword ?? ""}
          onChange={handleChange}
          Icon={Key}
          placeholder="•••••••••••••••••"
        />
      )}
    </div>
  );
};

export default AuthInputs;