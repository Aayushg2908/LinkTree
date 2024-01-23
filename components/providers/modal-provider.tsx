"use client";

import { useEffect, useState } from "react";
import { CreateLinkTreeModal } from "../CreateLinkTreeModal";
import { CreateLinkModal } from "../CreateLinkModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateLinkTreeModal />
      <CreateLinkModal />
    </>
  );
};

export default ModalProvider;
