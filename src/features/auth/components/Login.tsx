"use client";

import {
  LoginUserDataType,
  loginUserSchema,
} from "@/features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { UserCheck } from "lucide-react";
import { loginUserAction } from "@/features/auth/server/auth.actions";
import { toast } from "sonner";




const Login = () => {

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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md border border-black/10 shadow-lg">
        {/* Header */}
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full border border-black flex items-center justify-center">
            <UserCheck className="w-7 h-7 text-black" />
          </div>
          <CardDescription className="text-black/70">
            Sign in to get started
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-1">
              <Label>Email *</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="border-black/20 focus:border-black focus:ring-black"
              />
              {errors.email && <p className="text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label>Password *</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="border-black/20 focus:border-black focus:ring-black"
              />
              {errors.password && <p className="text-destructive">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-black/90"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-center gap-1 text-sm">
          <span className="text-black/60">Don't have an account?</span>
          <Link href="/register" className="font-medium underline">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
