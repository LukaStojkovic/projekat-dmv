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
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const { register: registerFn } = useAuthStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Petar Petrovic"
                  {...register("username", {
                    required: "Username is required",
                    maxLength: {
                      value: 30,
                      message:
                        "Username cannot contain more than 30 characters",
                    },
                    min: {
                      value: 6,
                      message: "Username must have at least 6 characters",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  {...register("password", {
                    required: "Password is required",
                    maxLength: {
                      value: 30,
                      message:
                        "Password cannot contain more than 30 characters",
                    },
                    min: {
                      value: 3,
                      message: "Password must have at least 3 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
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
