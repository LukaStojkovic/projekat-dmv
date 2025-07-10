import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import LogoutButton from "./LogoutButton";

export default function UserMenu() {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full max-w-[30rem] bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/dmv-logo.png"
            alt="Logo"
            className="w-16 h-16 p-2 rounded-full border-2"
          />
          <p className="text-md font-semibold">Welcome {authUser.username}</p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
