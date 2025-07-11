import DeviceTable from "@/components/DeviceTable";
import Graph from "@/components/Graph";
import Navigation from "@/components/Navigation";
import UserMenu from "@/components/UserMenu";
import { useState } from "react";

export default function HomePage() {
  const [tab, setTab] = useState("devices");

  return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-screen bg-gray-100 px-4">
      <UserMenu />
      <Navigation onChange={setTab} />

      <div className="w-full max-w-7xl px-4">
        {tab === "devices" && <DeviceTable />}
        {tab === "graph" && <Graph />}
      </div>
    </div>
  );
}
