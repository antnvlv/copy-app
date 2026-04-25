import { useEffect } from "react";

export function useClickOutside(refs, callback, enabled = true) {
    useEffect(() => {
        if (!enabled) return;

        function handle(e) {
            const clickedInside = refs.some(
                (r) => r.current && r.current.contains(e.target)
            );

            if (!clickedInside) callback();
        }

        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [refs, callback, enabled]);
}