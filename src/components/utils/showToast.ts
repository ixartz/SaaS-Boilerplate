// utils/showToast.ts
import toast from "react-hot-toast";

export type ToastType = "success" | "error" | "info";

export const showToast = (message: string, type: ToastType = "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
};
