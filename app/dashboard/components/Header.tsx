"use client";
import { ProfileDropdown } from "./ProfileDropdown";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Hi, {currentUser?.user_name}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};
