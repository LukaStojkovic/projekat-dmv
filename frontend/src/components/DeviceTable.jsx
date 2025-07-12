import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteDevice as deleteDeviceFn,
  getDevice,
} from "@/services/apiDevice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2, Trash2 } from "lucide-react";
import AddDevice from "./AddDevice";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import EditButton from "./EditButton";
import useGetDevices from "@/hooks/useGetDevices";

export default function DeviceTable() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { devices, isLoading } = useGetDevices(page);

  const { mutate: deleteDevice } = useMutation({
    mutationFn: (deviceId) => deleteDeviceFn(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
    },
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Devices</h2>
          <AddDevice />
        </div>
        <div className="min-h-[420px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Connection Status</TableHead>
                <TableHead className="text-center">Battery Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices?.data.devices.length <= 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-gray-500 "
                  >
                    You don't have any devices yet. Start by adding one.
                  </TableCell>
                </TableRow>
              ) : (
                devices?.data?.devices.map((device) => (
                  <TableRow key={device.id} className="cursor-pointer">
                    <TableCell>{device?.name}</TableCell>
                    <TableCell>{device?.type}</TableCell>
                    <TableCell>{device?.location}</TableCell>
                    <TableCell
                      className={cn(
                        `text-center`,
                        device?.connectionStatus === "offline"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {device?.connectionStatus}
                    </TableCell>
                    <TableCell className="text-center">
                      {device?.batteryStatus}%
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            deleteDevice(device.id);
                            toast.error(`You deleted device '${device.name}'`);
                          }}
                        >
                          <Trash2 className="size-4 text-red-500 cursor-pointer hover:text-red-700" />
                        </button>
                        <EditButton device={device} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || isLoading}
          >
            <ArrowLeft />
          </Button>
          <p className="text-sm text-gray-600">
            {page} / {devices?.data?.totalPages || 1}
          </p>
          <Button
            variant="outline"
            onClick={() =>
              setPage((p) => (p < devices.data.totalPages ? p + 1 : p))
            }
            disabled={page >= devices.data.totalPages}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
