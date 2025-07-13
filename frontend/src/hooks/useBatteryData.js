import { getBatteryFluctuation } from "@/services/apiDevice";
import { useQuery } from "@tanstack/react-query";

export default function useBatteryData(id) {
  const { data: batteryData, isLoading: isLoadingBatteryData } = useQuery({
    queryKey: ["batteryData", id],
    queryFn: () => getBatteryFluctuation(id),
  });

  console.log("Battery Data:", batteryData);

  return { batteryData, isLoadingBatteryData };
}
