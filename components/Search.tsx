"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = searchParams.get("query") || "";
  const [value, setValue] = useState(urlQuery);

  useEffect(() => {
    const onPopState = () => {
      setValue(new URLSearchParams(window.location.search).get("query") || "");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (value === urlQuery) return;
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, urlQuery, searchParams, pathname, router]);

  const clearSearch = () => {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="library-search-wrapper">
      <div className="pl-4">
        <SearchIcon size={20} className="text-[var(--text-muted)]" />
      </div>
      <Input
        type="text"
        placeholder="Search books by title or author"
        className="library-search-input border-none shadow-none focus-visible:ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          className="mr-3 flex items-center text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Search;
