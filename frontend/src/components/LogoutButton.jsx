import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function LogoutButton() {
  const { logout } = useAuthStore();

  return (
    <Button
      variant="ghost"
      onClick={logout}
      className="text-gray-500 hover:text-red-600 transition-colors duration-200"
      aria-label="Logout"
      title="Logout"
    >
      <LogOut className="w-5 h-5" />
    </Button>
  );
}
