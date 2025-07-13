import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import AddDevice from "./AddDevice";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import EditButton from "./EditButton";
import useGetDevices from "@/hooks/useGetDevices";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import useDeleteDevice from "@/hooks/useDeleteDevice";
import Spinner from "./Spinner";

export default function DeviceTable() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { devices, isLoading } = useGetDevices(page);
  const { deleteDevice, isDeletingDevice } = useDeleteDevice();

  return (
    <div className="w-full flex justify-center">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center rounded-md">
          <Spinner />
        </div>
      )}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Devices Table</h2>
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
                  <TableRow key={device.id}>
                    <TableCell
                      className="hover:underline cursor-pointer text-gray-700"
                      onClick={() => navigate(`/device/${device.id}`)}
                    >
                      <span className="flex items-center gap-1 group-hover:underline underline-offset-2">
                        {device?.name}
                      </span>
                    </TableCell>
                    <TableCell>{device?.type}</TableCell>
                    <TableCell>{device?.location}</TableCell>
                    <TableCell
                      className={cn(
                        "text-center text-sm font-medium",
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
                          disabled={isDeletingDevice}
                        >
                          {!isDeletingDevice ? (
                            <Trash2 className="size-4 text-red-500 cursor-pointer hover:text-red-700" />
                          ) : (
                            <Spinner />
                          )}
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

        <Pagination
          setPage={setPage}
          page={page}
          devices={devices}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
