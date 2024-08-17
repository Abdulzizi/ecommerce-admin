"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect, useState } from "react";

const SetupPage = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
    setIsMounted(true);
  }, [isOpen, onOpen]);

  if (!isMounted) {
    return null;
  }

  return null;
  
};

export default SetupPage;
