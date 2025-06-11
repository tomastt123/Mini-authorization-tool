import type React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    style={{
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
  >
    {children}
  </button>
);

export default PrimaryButton;
