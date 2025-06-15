import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import PrimaryButton from "../components/PrimaryButton";

const CodePage = () => {
  const { anonCode } = useAuth();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (anonCode) {
      setCode(anonCode);
    } else {
      const saved = localStorage.getItem("anonCode");
      if (saved) setCode(saved);
    }
  }, [anonCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  if (!code) {
    return <p>No anonymous code found.</p>;
  }

  return (
    <div className="container">
      <h1>Anonymous Access Code</h1>
      <p>Save this 16-digit code — it won’t be shown again!</p>

      <div className="code-box">{code}</div>

      <PrimaryButton onClick={handleCopy}>
        {copied ? "Copied!" : "Copy to Clipboard"}
      </PrimaryButton>
    </div>
  );
};

export default CodePage;
