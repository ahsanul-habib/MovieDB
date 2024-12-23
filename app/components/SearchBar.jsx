"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [previousURL, setPreviousURL] = useState("");

  useEffect(() => {
    if (pathName.slice(0, 13) !== "/movie/search") {
      setPreviousURL(pathName);
    }
  }, [pathName]);

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      // Go back to the previous URL if search is cleared
      router.replace(previousURL || "/");
    } else {
      router.replace(`/movie/search?query=${value}`);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search movies..."
        className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
      />
      <div
        id="searchResults"
        className="absolute w-full mt-2 bg-black bg-opacity-90 rounded-lg hidden"
      />
    </div>
  );
};

export default SearchBar;
