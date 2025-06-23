import { useState, useRef, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const ProfileDropdown = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axiosInstance.post("/auth/logout/", {}, { withCredentials: true }),
    onSuccess: () => {
      toast.warning("Logout Successful", {
        description: "Please login again to continue...",
      });

      router.push("/login/student");
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as { detail?: string })?.detail ||
        "Something went wrong. Please try again.";

      toast.error("Login Failed", {
        description: message,
      });

      console.error("Login error:", error);
    },
  });

  const handleLogout = async () => {
    mutate();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {currentUser?.user_name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {currentUser?.user_name}
              </p>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>

            <Button className="cursor-pointer w-full flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
              <Settings className="w-4 h-4 mr-3" />
              Account Settings
            </Button>

            <Button
              isLoading={isPending}
              onClick={handleLogout}
              className="cursor-pointer w-full flex items-center justify-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Log Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
