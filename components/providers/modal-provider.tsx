"use client";

import { useEffect, useState } from "react";
import { CreateLinkTreeModal } from "../CreateLinkTreeModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateLinkTreeModal />
    </>
  );
};

export default ModalProvider;
