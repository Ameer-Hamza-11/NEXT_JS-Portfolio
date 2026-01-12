import { UserCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";

export function ProfileCompletion() {
  return (
    <div className="w-full">
      <Item
        variant="outline"
        className="
          border-red-300 
          bg-red-50/60 
          flex flex-col gap-4 
          sm:flex-row 
          sm:items-center
        "
      >
        {/* Icon */}
        <ItemMedia
          variant="icon"
          className="text-red-600 bg-red-100 rounded-full"
        >
          <UserCircle />
        </ItemMedia>

        {/* Content */}
        <ItemContent>
          <ItemTitle className="text-red-800">Complete your profile</ItemTitle>

          <ItemDescription className="text-red-700">
            Your profile is incomplete. Please complete your profile to unlock
            all dashboard features and keep your account secure.
          </ItemDescription>
        </ItemContent>

        {/* Action */}
        <ItemActions className="w-full sm:w-auto">
          <Link href="/dashboard/settings">
            <Button
              size="sm"
              className="
              w-full 
              sm:w-auto 
              bg-red-600 
              hover:bg-red-700 
              text-white
            "
            >
              Complete now
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </ItemActions>
      </Item>
    </div>
  );
}
