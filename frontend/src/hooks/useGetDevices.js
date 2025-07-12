import { getDevice } from "@/services/apiDevice";
import { useQuery } from "@tanstack/react-query";

export default function useGetDevices(page = 1) {
  const { data: devices, isLoading } = useQuery({
    queryFn: () => getDevice(page),
    queryKey: ["devices", page],
    keepPreviousData: true,
  });

  return { devices, isLoading };
}
