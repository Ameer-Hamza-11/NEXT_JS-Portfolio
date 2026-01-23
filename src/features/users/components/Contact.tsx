"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactSchema, contactSchemaType } from "../user.contacts.schema";
import { postContactAction } from "../server/user.contact.action";
import { toast } from "sonner";

type UserProps = {
  session: {
    id: string;
    expiresAt: Date;
    userAgent: string;
    ip: string;
  };
  id: number;
  name: string;
  userName: string;
  role: "user" | "admin";
  phoneNumber: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
const Contact = ({ user }: { user: UserProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<contactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      subject: "",
      message: "",
    },
  });

  // const [success, setSuccess] = useState(false);

  const onSubmit = async (values: contactSchemaType) => {
    const res = await postContactAction(values, user.id);
    if (res.status === "SUCCESS") {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Contact Me</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <Input placeholder="Your name" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <Input placeholder="Subject" {...register("subject")} />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <Textarea
                placeholder="Write your message..."
                className="min-h-[120px]"
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
