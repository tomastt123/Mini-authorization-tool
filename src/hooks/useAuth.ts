import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

export type AuthState = {
  user?: string;
  isLoading: boolean;
  error: string;
};

export const useAuth = () => {
  const [input, setInput] = useState("");
  const [pin, setPin] = useState("");
  const [anonCode, setAnonCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const navigate = useNavigate();

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validateCode = (val: string) => /^\d{16}$/.test(val);

  const validatePin = (val: string) => /^\d{6}$/.test(val);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (validateEmail(input)) {
      setIsLoading(true);
      try {
        const res = await fetch("/v1/user/register/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: input, lang: "ru" }),
        });

        if (res.ok) {
          navigate("/auth/email");
        } else if (res.status === 422) {
          setError("Invalid email format");
        } else {
          setError("Failed to send PIN");
        }
      } catch {
        setError("Network error");
      } finally {
        setIsLoading(false);
      }
    } else if (validateCode(input)) {
      setIsLoading(true);
      try {
        const res = await fetch("/v1/auth/login/code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login_code: input }),
        });

        if (res.ok) {
          navigate("/");
        } else if (res.status === 401) {
          setError("Invalid code");
        } else {
          setError("Login error");
        }
      } catch {
        setError("Network error");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Invalid email or 16-digit code");
    }
  };

  const handleEmailRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(input)) {
        setError("Invalid email format");
        return;
    }

  setIsLoading(true);
    try {
      const res = await fetch("/v1/user/register/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input, lang: "ru" }),
      });

      if (res.ok) {
      localStorage.setItem("registeredEmail", input); // ✅ Save it here
      navigate("/auth/email");
      } else if (res.status === 422) {
        setError("Invalid email format");
      } else {
        setError("Failed to register");
      }
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };


 const handlePinSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError("");

  if (!validatePin(pin)) {
    setError("PIN must be 6 digits");
    return;
  }

  setIsLoading(true);

  const storedEmail = localStorage.getItem("registeredEmail") || "";


  try {
    const res = await fetch("/v1/auth/login/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: storedEmail,
        pincode: Number(pin),
      }),
    });

    if (res.ok) {
      localStorage.removeItem("registeredEmail");
      navigate("/");
    } else if (res.status === 401) {
      setError("Invalid PIN");
    } else if (res.status === 422) {
      setError("Invalid email format");
    } else {
      setError("PIN verification error");
    }
  } catch {
    setError("Network error");
  } finally {
    setIsLoading(false);
  }
};

  const generateAnonCode = async () => {
  setIsLoading(true);
  setError("");

  try {
    const response = await fetch("/v1/user/register/code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const data = await response.json();
      setAnonCode(data.data.login_code);
      localStorage.setItem("anonCode", data.data.login_code);
      navigate("/reg/code");
    } else {
      setError("Failed to generate anonymous code");
    }
  } catch {
    setError("Network error");
  } finally {
    setIsLoading(false);
  }
};

  return {
    input,
    setInput,
    pin,
    setPin,
    anonCode,
    error,
    isLoading,
    handleLogin,
    handleEmailRegister,
    handlePinSubmit,
    generateAnonCode,
    registeredEmail
  };
};