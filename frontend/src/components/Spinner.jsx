import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin size-8" />
    </div>
  );
}
