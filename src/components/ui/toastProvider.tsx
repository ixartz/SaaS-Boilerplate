// components/ToastProvider.tsx
import { Toaster } from "react-hot-toast";

export const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: "#333",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "8px",
      },
    }}
  />
);
