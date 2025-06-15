import React from "react";
import { useAuth } from "../hooks/useAuth";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

const EmailPinPage = () => {
  const {
    pin,
    setPin,
    error,
    isLoading,
    handlePinSubmit,
  } = useAuth();

  return (
    <div className="container">
      <h1>Enter your 6-digit PIN</h1>

      <form onSubmit={handlePinSubmit}>
        <InputField
          label="PIN Code"
          type="text"
          value={pin}
          maxLength={6}
          onChange={(e) => setPin(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <PrimaryButton type="submit" disabled={isLoading || pin.length !== 6}>
          {isLoading ? "Verifying..." : "Verify PIN"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default EmailPinPage;
