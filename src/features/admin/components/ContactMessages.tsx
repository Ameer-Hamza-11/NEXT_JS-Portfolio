"use client";

import React from "react";
import { ContactType } from "@/features/users/server/user.contact.action";
import { Mail, User } from "lucide-react";

const ContactMessages = ({ messages }: { messages: ContactType[] }) => {
  if (!messages.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        No messages found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold">Contact Messages</h2>
        <p className="text-sm text-muted-foreground">
          Messages sent from contact form
        </p>
      </div>

      {/* Messages */}
      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-xl border bg-background p-4 transition hover:bg-muted/30"
          >
            {/* Top Row */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-sm font-medium">{msg.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {msg.email}
                  </p>
                </div>
              </div>

              <span className="text-xs text-muted-foreground">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Subject */}
            <div className="mt-3 flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {msg.subject}
            </div>

            {/* Message */}
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {msg.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMessages;
