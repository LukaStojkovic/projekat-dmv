import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-800  mb-2">
        Page Not Found
      </p>
      <p className="text-gray-600  mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button
        onClick={() => navigate("/")}
        variant={"primary"}
        size={"lg"}
        className="px-6 py-2 text-sm"
      >
        <span className="flex justify-center items-center gap-2">
          <ArrowLeft />
          Go Back
        </span>
      </Button>
    </div>
  );
}
