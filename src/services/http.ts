import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
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

class APIClient {
  private http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });

    // Attach token before each request
    this.http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = getSessionToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Normalize errors
    this.http.interceptors.response.use(
      (res) => res,
      (error: AxiosError<any>) => {
        const status = error.response?.status;
        const msg =
          (error.response?.data as any)?.message ||
          error.message ||
          "Request failed";
        throw new ApiError(msg, { status, data: error.response?.data });
      }
    );
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const res = await this.http.request<T>(config);
    return res.data as T;
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "GET", ...config });
  }
  post<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "POST", data: body, ...config });
  }
  put<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "PUT", data: body, ...config });
  }
  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "DELETE", ...config });
  }
}

// Default export for your main API
export const API = new APIClient(import.meta.env.VITE_API_URL ?? "https://auth-ignite.onrender.com");

// Named export so you can make custom ones per service
export { APIClient };
