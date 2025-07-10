import { axiosInstance } from "@/lib/axios";

export async function getDevice() {
  try {
    const res = await axiosInstance.get("/devices");

    return res.data;
  } catch (err) {
    console.log("Error in getDevice", err.response.data.message);
  }
}

export async function addDevice(deviceData) {
  try {
    const res = await axiosInstance.post("/devices", deviceData);

    return res.data;
  } catch (err) {
    console.log("Error in addDevice", err.response.data.message);
  }
}

export async function deleteDevice(deviceId) {
  try {
    const res = await axiosInstance.delete(`/devices/${deviceId}`);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error in deleteDevice", err.response.data.message);
  }
}
