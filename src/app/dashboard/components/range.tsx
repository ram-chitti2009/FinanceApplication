"use client";

import Select from "@/app/components/select";
import { createClient } from "@supabase/supabase-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Range() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [range, setRange] = useState<string | null>(null);

  useEffect(() => {
    const initializeRange = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const rangeParam = urlParams.get("range");

      if (rangeParam) {
        setRange(rangeParam);
        return;
      }

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      );

      const { data, error } = await supabase.auth.getUser();
      let userDefault = "last30days";
      if (!error && data.user?.user_metadata?.defaultView) {
        userDefault = data.user.user_metadata.defaultView;
      }
      setRange(userDefault);

      // Update the URL with the user's default
      urlParams.set("range", userDefault);
      router.replace(`${pathname}?${urlParams.toString()}`);
    };

    initializeRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange = e.target.value;
    setRange(newRange);

    const params = new URLSearchParams(searchParams.toString());
    params.set("range", newRange);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!range) return null;

  return (
    <Select
      value={range}
      onChange={handleRangeChange}
      aria-label="Select time range"
    >
      <option value="last24hours">Last 24 Hours</option>
      <option value="last7days">This Week</option>
      <option value="last30days">This Month</option>
      <option value="last12months">This Year</option>
    </Select>
  );
}
