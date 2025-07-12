import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { unparse } from "papaparse";
import { toast } from "sonner";
import { getAllDevicesFromUser, getDevice } from "@/services/apiDevice";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleExportAllCSV = async () => {
  try {
    const res = await getAllDevicesFromUser();
    const allDevices = res.data;

    if (!allDevices.length) {
      toast.warning("No devices found to export.");
      return;
    }

    const csv = unparse(
      allDevices.map((device) => ({
        Name: device.name,
        Type: device.type,
        Location: device.location,
        ConnectionStatus: device.connectionStatus,
        BatteryStatus: `${device.batteryStatus}%`,
      }))
    );

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "all-devices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    toast.error("Failed to export CSV.");
    console.error(error);
  }
};
