import React from "react";
import Link from "next/link";
import { sizes, variants } from "../lib/variants";
import { ChevronLeft } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div>
      <main>
        <div className="absolute left-8 top-8">
          <Link
            href="/"
            className={`${variants["ghost"]} ${sizes["base"]} flex items-center space-x-2 text-sm`}
          >

            <ChevronLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>
        </div>
        <div mt-8>
          {children} 
        </div>
      </main>
    </div>
  );
}
