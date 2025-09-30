// app/products/error.tsx
"use client";

import { useEffect } from "react";
import ErrorComponent from "@/Components/Error";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorComponent error={error.message} />;
}
