import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export async function getDevice(page) {
  try {
    const res = await axiosInstance.get(`/devices?page=${page}`);

    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);
    console.log("Error in getDevice", err.response.data.message);
  }
}

export async function addDevice(deviceData) {
  try {
    const res = await axiosInstance.post("/devices", deviceData);

    if (res.status === 201) {
      toast.success(`You created device '${res.data.name}'`);
    }

    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);
    console.log("Error in addDevice", err.response.data.message);
  }
}

export async function deleteDevice(deviceId) {
  try {
    const res = await axiosInstance.delete(`/devices/${deviceId}`);

    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);
    console.log("Error in deleteDevice", err.response.data.message);
  }
}

export async function updateDevice(data, deviceId) {
  try {
    const res = await axiosInstance.put(`/devices/${deviceId}`, data);

    if (res.status === 200) {
      toast.success(`Device "${data.name}" updated successfully`);
    }

    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);
    console.log("Error in updateDevice", err.response.data.message);
  }
}

export async function getDevicesStats() {
  try {
    const res = await axiosInstance.get(`/devices/get-device-stats`);

    return res.data;
  } catch (err) {
    toast.error(err.response.data.message);
    console.log("Error in getDevicesStats", err.response.data.message);
  }
}
