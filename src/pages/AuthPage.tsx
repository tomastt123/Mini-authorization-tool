import type React from "react";
import { useAuth } from "../hooks/useAuth";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

const AuthPage: React.FC = () => {
  const { input, setInput, error, isLoading, handleLogin } = useAuth();

  return (
    <div className="container">
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <InputField
            placeholder="Email or 16-digit code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </PrimaryButton>
        </form>
        {error && (
          <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
