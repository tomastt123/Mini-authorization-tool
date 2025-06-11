import type React from "react";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { useAuth } from "../hooks/useAuth";

const RegPage: React.FC = () => {
  const {
    input,
    setInput,
    error,
    isLoading,
    handleEmailRegister,
    generateAnonCode,
  } = useAuth();

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleEmailRegister}>
        <InputField
          placeholder="Enter your email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register with Email"}
        </PrimaryButton>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ margin: "16px 0" }}>or</p>

      <PrimaryButton onClick={generateAnonCode} disabled={isLoading}>
        {isLoading ? "Loading..." : "Anonymous Registration"}
      </PrimaryButton>
    </div>
  );
};

export default RegPage;
