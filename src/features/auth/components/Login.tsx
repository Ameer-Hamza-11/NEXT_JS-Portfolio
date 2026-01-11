"use client";

import {
  LoginUserDataType,
  loginUserSchema,
} from "@/features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, UserCheck } from "lucide-react";
import { loginUserAction } from "@/features/auth/server/auth.actions";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginUserDataType>({
    resolver: zodResolver(loginUserSchema),
  });

  const handleFormSubmit = async (data: LoginUserDataType) => {
    const result = await loginUserAction(data);
    if (result.status === "SUCCESS") {
      toast.success(result.message);
      window.location.href = "/";
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md border border-black/10 shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full border border-black flex items-center justify-center">
            <UserCheck className="w-7 h-7" />
          </div>
          <CardDescription className="text-black/70">
            Welcome back, sign in to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-black/50" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 border-black/20 focus:border-black"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-black/50" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 border-black/20 focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-black/50 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-black/90 rounded-xl"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          <span className="text-black/60">Don’t have an account?</span>
          <Link href="/register" className="ml-1 font-medium underline">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
