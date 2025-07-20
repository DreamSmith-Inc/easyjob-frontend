import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User, UserPen } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ProfileDropdown = () => {
  const router = useRouter();

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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center justify-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded-full flex items-center justify-center border">
          <User className="w-4 h-4 text-black" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row items-center">
          <UserPen className="w-4 h-4 " />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex flex-row items-center"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4 text-red-500" />
          )}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
