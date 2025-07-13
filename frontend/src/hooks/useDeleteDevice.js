import { deleteDevice as deleteDeviceFn } from "@/services/apiDevice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteDevice() {
  const queryClient = useQueryClient();

  const { mutate: deleteDevice, isLoading: isDeletingDevice } = useMutation({
    mutationFn: (deviceId) => deleteDeviceFn(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
    },
  });

  return { deleteDevice, isDeletingDevice };
}
