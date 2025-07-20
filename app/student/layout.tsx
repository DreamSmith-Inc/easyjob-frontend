import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/AuthContext";
import React, { ReactNode } from "react";
import { AppSidebar } from "./dashboard/components/Sidebar";
import { Header } from "./dashboard/components/Header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="min-h-screen relative bg-gray-50 w-full">
          <Header />
          <main className="px-6 py-8">{children}</main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
