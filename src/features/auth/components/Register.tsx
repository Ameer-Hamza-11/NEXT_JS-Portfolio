"use client";

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
import { registerUserAction } from "@/features/auth/server/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterUserWithConfirmDataType,
  registerUserWithConfirmSchema,
} from "@/features/auth/auth.schema";
import { toast } from "sonner";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserWithConfirmDataType>({
    resolver: zodResolver(registerUserWithConfirmSchema),
  });

  const handleFormSubmit = async (data: RegisterUserWithConfirmDataType) => {
    const result = await registerUserAction(data);
    if (result.status === "SUCCESS") {
      window.location.href = "/";
      toast.success(result.message);
    } else toast.error(result.message);
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
            Create your account to get started
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-1">
              <Label>Name *</Label>
              <Input
                {...register("name")}
                placeholder="Enter your name"
                className="border-black/20 focus:border-black focus:ring-black"
              />
              {errors.name && <p className="text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <Label>Username *</Label>
              <Input
                {...register("userName")}
                placeholder="Enter your username"
                className="border-black/20 focus:border-black focus:ring-black"
              />
              {errors.userName && <p className="text-destructive">{errors.userName.message}</p>}
            </div>

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
              <Label>Phone Number *</Label>
              <Input
                {...register("phoneNumber")}
                placeholder="+92 3xx xxxxxxx"
                className="border-black/20 focus:border-black focus:ring-black"
              />
              {errors.phoneNumber && <p className="text-destructive">{errors.phoneNumber.message}</p>}
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

            <div className="space-y-1">
              <Label>Confirm Password *</Label>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className="border-black/20 focus:border-black focus:ring-black"
              />
              {errors.confirmPassword && (
                <p className="text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-black/90"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-center gap-1 text-sm">
          <span className="text-black/60">Already have an account?</span>
          <Link href="/login" className="font-medium underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
