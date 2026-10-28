"use client";

import { ReactNode, useEffect, useState } from "react";

interface DeferredComponentProps {
  delay?: number;
  children: ReactNode;
}

const DeferredComponent = ({
  delay = 200,
  children,
}: DeferredComponentProps) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // No delay: render straight away below, no timer and no extra state update needed
    if (delay === 0) return;

    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  if (delay !== 0 && !isDeferred) {
    return null;
  }

  return <>{children}</>;
};

export default DeferredComponent;
