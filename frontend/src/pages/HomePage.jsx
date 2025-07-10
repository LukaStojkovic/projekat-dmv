import DeviceTable from "@/components/DeviceTable";
import UserMenu from "@/components/UserMenu";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-screen bg-gray-100 px-4">
      <UserMenu />
      <DeviceTable />
    </div>
  );
}
