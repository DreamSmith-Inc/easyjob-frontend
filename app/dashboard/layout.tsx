import { AuthProvider } from "@/context/AuthContext";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
