import { getDevicesStats } from "@/services/apiDevice";
import { useQuery } from "@tanstack/react-query";

export default function useDeviceStats() {
  const { data: getDeviceStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["deviceStats"],
    queryFn: getDevicesStats,
  });

  return { getDeviceStats, isLoadingStats };
}
