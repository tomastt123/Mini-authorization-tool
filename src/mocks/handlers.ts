import { http, HttpResponse } from "msw";

interface RegisterEmailRequest {
  email: string;
  lang: string;
}
interface LoginEmailRequest {
  email: string;
  pincode: number;
}
interface LoginCodeRequest {
  login_code: string;
}
interface GoogleAuthRequest {
  code: string;
  redirect_uri: string;
}

const MOCK_SESSION_TOKEN = "978fc50daaa25cf0206f678a5843b06d43fc0cab8e565b9a65cf77e3ee448784";
const VALID_PIN_CODE = 123456;

let lastGeneratedCode: string = "";

function generateRandomCode(length = 16): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

export const handlers = [
  http.post("/v1/user/register/code", () => {
    lastGeneratedCode = generateRandomCode();
    return HttpResponse.json({
      data: {
        login_code: lastGeneratedCode,
      },
    });
  }),

  http.post<never, RegisterEmailRequest>("/v1/user/register/email", async ({ request }) => {
    const { email, lang } = await request.json();

    if (!email || !email.includes("@")) {
      return HttpResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid email format",
            details: [{ field: "email", message: "Email must be valid" }],
          },
        },
        { status: 422 }
      );
    }

    if (!lang) {
      return HttpResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Language is required",
            details: [{ field: "lang", message: "Language must be specified" }],
          },
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({ data: [] });
  }),

  http.post<never, LoginEmailRequest>("/v1/auth/login/email", async ({ request }) => {
    const { email, pincode } = await request.json();

    if (!email || !email.includes("@")) {
      return HttpResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid email",
            details: [{ field: "email", message: "Must be valid email" }],
          },
        },
        { status: 422 }
      );
    }

    if (pincode !== VALID_PIN_CODE) {
      return HttpResponse.json(
        {
          error: {
            code: "WRONG_PIN_CODE",
            message: "PIN code expired or missing",
          },
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      data: {
        session: MOCK_SESSION_TOKEN,
      },
    });
  }),

  http.post<never, LoginCodeRequest>("/v1/auth/login/code", async ({ request }) => {
    const { login_code } = await request.json();

      const stored = localStorage.getItem("anonCode");
      if (login_code === stored) {
        return HttpResponse.json(
        {
        data: {
          session: MOCK_SESSION_TOKEN,
        },
      });
    }

    return HttpResponse.json(
      {
        error: {
          code: "AUTHENTICATION_ERROR",
          message: "Authentication error",
        },
      },
      { status: 401 }
    );
  }),

  http.post<never, GoogleAuthRequest>("/v1/user/register/google_account", async ({ request }) => {
    const { code, redirect_uri } = await request.json();

    if (!code || !redirect_uri) {
      return HttpResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Missing required fields",
            details: [
              !code && { field: "code", message: "Authorization code is required" },
              !redirect_uri && { field: "redirect_uri", message: "Redirect URI is required" },
            ].filter(Boolean),
          },
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      data: {
        session: MOCK_SESSION_TOKEN,
      },
    });
  }),
];
