"use client";
import { ProfileDropdown } from "./ProfileDropdown";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white sticky top-0 border-b border-gray-200 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Hi,{" "}
              {`${currentUser?.firstname}` + " " + `${currentUser?.lastname}`}
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
