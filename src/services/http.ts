// src/services/http.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getSessionToken } from "../components/utils/sessionHelper";

export class ApiError extends Error {
  status?: number;
  data?: unknown;
  constructor(message: string, opts?: { status?: number; data?: unknown }) {
    super(message);
    this.name = "ApiError";
    this.status = opts?.status;
    this.data = opts?.data;
  }
}

// Create Axios instance
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://auth-ignite.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach Authorization header if token exists
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: normalize errors
http.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const msg = error.response?.data?.message || error.message || "Request failed";
    throw new ApiError(msg, { status, data: error.response?.data });
  }
);

// Minimal typed request wrapper (returns data or throws ApiError)
async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const res = await http.request<T>(config);
    return res.data as T;
  } catch (e) {
    throw e; // Already normalized in interceptor
  }
}

export const API = {
  get:    <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ url, method: "GET", ...config }),
  post:   <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    request<T>({ url, method: "POST", data: body, ...config }),
  put:    <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    request<T>({ url, method: "PUT", data: body, ...config }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ url, method: "DELETE", ...config }),
};
