import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005";

// Centralized Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type ApiRequestOptions = {
  method?: string;
  body?: string | FormData;
  headers?: Record<string, string>;
  expectJson?: boolean;
};

export async function apiFetch(path: string, options: ApiRequestOptions = {}) {
  const { method = "GET", body, headers, expectJson = true } = options;

  try {
    let data = body;
    // If body is a string (legacy behavior from fetch), parse it back for Axios
    if (typeof body === "string") {
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
    }

    const response = await axiosInstance({
      url: path,
      method,
      data,
      headers,
      responseType: expectJson ? "json" : "text",
    });

    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ message?: string; error?: string }>;
    
    const message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      "CONNECTION_REFUSED // BACKEND_OFFLINE";

    const error = new Error(message) as Error & {
      status?: number;
      data?: unknown;
    };
    error.status = axiosError.response?.status;
    error.data = axiosError.response?.data;
    
    throw error;
  }
}

export { axiosInstance, API_BASE_URL };
