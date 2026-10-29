import { useEffect, useState } from "react";

function atPageEnd() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
}

export function useActiveSection(ids: string[]) {
  const [current, setCurrent] = useState(ids[0] ?? "");

  useEffect(() => {
    setCurrent(ids[0] ?? "");
    const targets = ids.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => element !== null);
    if (!targets.length || typeof IntersectionObserver === "undefined") return;

    const last = ids[ids.length - 1];
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = ids.find((id) => visible.has(id));
        if (atPageEnd()) setCurrent(last);
        else if (first) setCurrent(first);
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );
    targets.forEach((target) => observer.observe(target));

    function onScroll() {
      if (atPageEnd()) setCurrent(last);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return current;
}
