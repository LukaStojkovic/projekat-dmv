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
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Petar Petrovic"
                  {...register("username", {
                    required: "Username is required",
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
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
