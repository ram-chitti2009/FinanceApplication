import Link from "next/link";
import React from "react";
import DarkModeToggle from "./dark-mode-toggle";
import useServerDarkMode from "../hooks/use-server-dark-mode";
import { createClient } from "../lib/supabase/server";
import Button from "./button";
import { CircleUser, KeyRound } from "lucide-react";
import SignOutButton from "./sign-out-button";
import Avatar from "./avatar";

export default async function PageHeader({className}: {className?: string}) {
  const theme = useServerDarkMode(); 
  const supabase = await createClient();
  const {data: user, error} = await supabase.auth.getUser();
  console.log("User data:", user, "Error:", error);

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-4">
        <div> <DarkModeToggle /> </div>

        {user && <Link href="/dashboard/settings">
          <Button variant="ghost" size="base" className="flex items-center space-x-2">
            
            <span>{user?.user?.user_metadata?.email || user?.user?.email}</span>
          </Button>
          <Avatar/> 
        </Link>}
        {!user && (
          <Link href="/login" className="text-sm">
            <Button variant="ghost" size="base" className="flex items-center space-x-2">
              <KeyRound className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </Link>
        )}

        <SignOutButton></SignOutButton>


      </div>
    </header>
  );
}


