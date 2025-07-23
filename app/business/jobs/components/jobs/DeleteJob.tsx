import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash2 } from "lucide-react";
import React from "react";

interface Props {
  id: string;
  onSuccess?: () => void;
}
import { toast } from "sonner";

export default function DeleteJob({ id, onSuccess }: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => axiosInstance.delete(`/business/jobposting/${id}/`),
    onSuccess: () => {
      toast.success("Job deleted");
      onSuccess?.(); // callback to update the UI
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as { detail?: string })?.detail ||
        "Something went wrong. Please try again.";

      toast.error(message);
      console.error("Registraion error:", error);
    },
  });

  return (
    <DropdownMenuItem
      className="text-destructive"
      disabled={isPending}
      onClick={() => mutate()}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete Job
    </DropdownMenuItem>
  );
}
