import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDevicesStats } from "@/services/apiDevice";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
// import useGetDevices from "@/hooks/useGetDevices";
import { handleExportAllCSV } from "@/lib/utils";

export default function Graph() {
  //   const { devices, isLoading: isLoadingDevices } = useGetDevices();

  const { data, isLoading } = useQuery({
    queryKey: ["deviceStats"],
    queryFn: getDevicesStats,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Devices by Type
      </h2>

      <div className="w-full overflow-x-auto flex justify-center">
        <div className="min-w-[400px] h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.data}
              barSize={40}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  fontSize: "0.875rem",
                  borderRadius: "0.5rem",
                }}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Bar dataKey="count" fill="#D9202A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={handleExportAllCSV}
        className={"flex items-center justify-center w-full"}
      >
        Export CSV
      </Button>
    </div>
  );
}
