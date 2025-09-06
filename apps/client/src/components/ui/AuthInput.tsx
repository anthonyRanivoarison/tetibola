import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  placeholder?: string;
}

const InputField = ({label, name, type, value, onChange, Icon, placeholder}: InputFieldProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="text-left font-semibold">{label}:</label>
    <div className="relative w-64 sm:w-78">
      <Icon size={16} className="absolute left-2 top-[31%] text-gray-400"/>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-xl pl-8 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default InputField;