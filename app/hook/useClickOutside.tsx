"use client";

import { useState, useEffect, useRef } from "react";
export const useClickOutSide = () => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen) {
      console.log("retrun");
      return;
    }

    const handleClick = (event: Event) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        setIsopen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);
  return { ref, isOpen, setIsopen };
};
