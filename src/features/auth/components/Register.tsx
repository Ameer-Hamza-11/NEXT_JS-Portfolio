"use client";

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
import { UserCheck, Eye, EyeOff, Mail, User, Phone, Lock } from "lucide-react";
import { registerUserAction } from "@/features/auth/server/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterUserWithConfirmDataType,
  registerUserWithConfirmSchema,
} from "@/features/auth/auth.schema";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      toast.success(result.message);
      window.location.href = "/";
    } else toast.error(result.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md border border-black/10 shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full border border-black flex items-center justify-center">
            <UserCheck className="w-7 h-7" />
          </div>
          <CardDescription className="text-black/70">
            Create your account to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <Label>Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-black/50" />
                <Input
                  {...register("name")}
                  placeholder="Enter your name"
                  className="pl-10 border-black/20 focus:border-black focus:ring-black rounded-xl"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <Label>Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-black/50" />
                <Input
                  {...register("userName")}
                  placeholder="Enter your username"
                  className="pl-10 border-black/20 focus:border-black focus:ring-black rounded-xl"
                />
              </div>
              {errors.userName && (
                <p className="text-sm text-destructive">{errors.userName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-black/50" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 border-black/20 focus:border-black focus:ring-black rounded-xl"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-black/50" />
                <Input
                  {...register("phoneNumber")}
                  placeholder="+92 3xx xxxxxxx"
                  className="pl-10 border-black/20 focus:border-black focus:ring-black rounded-xl"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
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
                  className="pl-10 pr-10 border-black/20 focus:border-black focus:ring-black rounded-xl"
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
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-black/50" />
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 border-black/20 focus:border-black focus:ring-black rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-black/50 hover:text-black"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-black/90 rounded-xl"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          <span className="text-black/60">Already have an account?</span>
          <Link href="/login" className="ml-1 font-medium underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
