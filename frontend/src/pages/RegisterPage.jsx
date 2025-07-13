import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const { register: registerFn } = useAuthStore();

  function onSubmit(userData) {
    registerFn(userData);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <img src="dmv-logo.png" className="w-24 h-24" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Register</CardTitle>
          <CardDescription className="text-center">
            Enter field below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm onSubmit={onSubmit} buttonLabel="Register" />
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Link to="/login" className="text-gray-600 hover:underline text-sm">
            Already have account?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
