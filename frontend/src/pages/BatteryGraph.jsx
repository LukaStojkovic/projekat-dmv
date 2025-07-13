import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useBatteryData from "@/hooks/useBatteryData";

export default function BatteryGraph() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { batteryData, isLoadingBatteryData } = useBatteryData(id);

  if (isLoadingBatteryData) return <Spinner />;

  return (
    <div className="min-h-screen w-full justify-center px-4 py-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-4 sm:p-6 rounded-xl shadow-md flex flex-col gap-6">
        <div className="flex justify-start items-center flex-wrap gap-2">
          <Button onClick={() => navigate("/")} variant="ghost">
            <ArrowLeft className="size-4" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">
            Battery Fluctuation
          </h2>
        </div>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={batteryData?.data}>
              <XAxis dataKey="hour" tickFormatter={(h) => `${h + 1}h`} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Battery"]}
                labelFormatter={(label) => `${label + 1}h`}
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  fontSize: "0.875rem",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#D9202A"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
