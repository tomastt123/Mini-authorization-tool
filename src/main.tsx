import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RegPage from "./pages/RegPage";
import CodePage from "./pages/CodePage";
import EmailPinPage from "./pages/EmailPinPage";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reg" element={<RegPage />} />
        <Route path="/auth/email" element={<EmailPinPage />} />
        <Route path="/reg/code" element={<CodePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
