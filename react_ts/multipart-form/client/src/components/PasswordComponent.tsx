import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordComponentProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  value: string | number;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  error: string;
}

const PasswordComponent = ({
  label,
  name,
  id,
  placeholder,
  value,
  width,
  onChange,
  required,
  error,
}: PasswordComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="form-field" style={{ width: `${width}` }}>
      <label htmlFor={id} className="flex gap-x-1">
        {label} {required && <p className="text-red-600">*</p>}
      </label>
      <div className="w-full flex gap-x-1">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ width: "100%" }}
        />
        <button
          className="bg-gray-200 px-2 rounded-md"
          onClick={handleShowPassword}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordComponent;
