import { baseApi } from "./baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    phone?: string;
    role: string;
  };
}

interface RequestOtpRequest {
  email?: string;
}

interface RequestOtpResponse {
  success: boolean;
  message: string;
  email: string;
  previewUrl?: string | null;
}

interface VerifyOtpRequest {
  email?: string;
  otp: string;
}

interface VerifyOtpResponse {
  success: boolean;
  verified: boolean;
  message: string;
}

interface ResetPasswordRequest {
  email?: string;
  otp: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    requestOtp: builder.mutation<RequestOtpResponse, RequestOtpRequest>({
      query: (body) => ({
        url: "/auth/request-otp",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;