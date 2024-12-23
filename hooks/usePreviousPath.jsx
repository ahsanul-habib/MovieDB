"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function usePreviousRoute() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const previousPath = useRef(null);

    useEffect(() => {
        const handleRouteChange = () => {
            previousPath.current = `${pathname}?${searchParams}`;
        };

        window.addEventListener("beforeunload", handleRouteChange);

        return () => {
            window.removeEventListener("beforeunload", handleRouteChange);
        };
    }, [pathname, searchParams]);

    return previousPath.current;
}
