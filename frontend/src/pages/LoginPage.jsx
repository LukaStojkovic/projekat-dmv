import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuthStore();

  function onSubmit(formData) {
    login(formData);
  }

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100">
      <img src="dmv-logo.png" className="w-24 h-24" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login</CardTitle>
          <CardDescription className="text-center">
            Enter field below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm onSubmit={onSubmit} buttonLabel="Login" />
        </CardContent>
        <CardFooter className="flex-col">
          <Link
            to="/register"
            className="text-gray-600 hover:underline text-sm"
          >
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
