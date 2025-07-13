import React, { useState } from "react";
import { Button } from "./ui/button";

export default function Navigation({ onChange }) {
  const [active, setActive] = useState("devices");

  function handleClick(tab) {
    setActive(tab);
    if (onChange) onChange(tab);
  }

  return (
    <div className=" bg-white p-1 rounded-lg shadow-md flex items-center justify-center gap-2">
      <Button
        variant={active === "devices" ? "primary" : "ghost"}
        onClick={() => handleClick("devices")}
        className="px-4"
      >
        Devices
      </Button>
      <Button
        variant={active === "graph" ? "primary" : "ghost"}
        onClick={() => handleClick("graph")}
        className="px-4"
      >
        Graph
      </Button>
    </div>
  );
}
