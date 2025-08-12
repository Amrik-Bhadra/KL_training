import React from "react";

interface InputComponentProps {
  label: string;
  type?: string;
  name: string;
  id: string;
  placeholder: string;
  value: string | number;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  error: string;
}

const InputComponent = ({
  label,
  type = "text",
  name,
  id,
  placeholder,
  value,
  width,
  onChange,
  required,
  error
}: InputComponentProps) => {
  return (
    <div className="form-field" style={{width: `${width}`}}>
      <label htmlFor={id} className="flex gap-x-1">
        {label} {required && <p className="text-red-600">*</p>}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      { error && <p className="text-red-500">{error}</p> }
    </div>
  );
};

export default InputComponent;
