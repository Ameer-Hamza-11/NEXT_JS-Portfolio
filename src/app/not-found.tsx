import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md space-y-5">
        {/* 404 Number */}
        <h1 className="text-7xl font-bold tracking-tight text-black">
          404
        </h1>

        {/* Message */}
        <p className="text-black/70 text-lg">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-black/10" />

        {/* Action */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-black underline underline-offset-4 hover:opacity-80"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
