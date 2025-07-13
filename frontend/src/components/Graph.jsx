import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { handleExportAllCSV } from "@/lib/utils";
import useDeviceStats from "@/hooks/useDeviceStats";

export default function Graph() {
  const { getDeviceStats, isLoadingStats } = useDeviceStats();

  if (isLoadingStats) return <Spinner />;

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Devices Graph
      </h2>

      {getDeviceStats?.data?.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto flex justify-center">
            <div className="min-w-[400px] h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getDeviceStats.data}
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
            className="flex items-center justify-center w-full mt-4"
          >
            Export CSV
          </Button>
        </>
      ) : (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </div>
  );
}
