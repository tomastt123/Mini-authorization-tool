import type React from "react";

type InputFieldProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    style={{
      width: "100%",
      padding: "8px",
      marginBottom: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    }}
  />
);

export default InputField;
