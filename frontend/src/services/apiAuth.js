import { axiosInstance } from "@/lib/axios";

export async function login(userData) {
  try {
    const res = await axiosInstance.post("/auth/login", userData);

    if (!data) throw new Error("Something went wrong!");

    return res.data;
  } catch (err) {
    if (err.response?.status === 409) {
      // TOAST ERROR MESSAGE OVDE
      throw new Error(err.response.data.message);
    }
  }
}
