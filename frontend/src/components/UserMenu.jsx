import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import LogoutButton from "./LogoutButton";

export default function UserMenu() {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full max-w-[30rem] bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-md font-semibold">Welcome {authUser.username}</p>
        <LogoutButton />
      </div>
    </div>
  );
}
