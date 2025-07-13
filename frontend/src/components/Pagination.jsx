import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Pagination({ setPage, page, devices, isLoading }) {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button
        variant="outline"
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1 || isLoading}
      >
        <ArrowLeft />
      </Button>
      <p className="text-sm text-gray-600">
        {page} / {devices?.data?.totalPages || 1}
      </p>
      <Button
        variant="outline"
        onClick={() =>
          setPage((p) => (p < devices.data.totalPages ? p + 1 : p))
        }
        disabled={page >= devices.data.totalPages}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
