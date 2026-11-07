"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function JoinBurstLink() {
  const router = useRouter();
  const [bursting, setBursting] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  function enter(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (timer.current !== null) window.clearTimeout(timer.current);
    setBursting(true);
    timer.current = window.setTimeout(() => router.push("/join"), 460);
  }

  return (
    <Link className={`button button-primary join-burst-link${bursting ? " is-bursting" : ""}`} href="/join" onClick={enter}>
      Start a conversation <span aria-hidden="true">↗</span>
      <span className="join-burst" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</span>
    </Link>
  );
}
