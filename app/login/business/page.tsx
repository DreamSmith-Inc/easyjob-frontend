"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/forms/LabelInputContainer";
import BottomGradient from "@/components/forms/BottomGradient";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { RoutesEnum } from "@/lib/routes";
import AuthRedirectText from "@/components/forms/AuthRedirectText";
import { AxiosError } from "axios";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function BusinessLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormInputs) =>
      axiosInstance.post("/auth/login/", data, { withCredentials: true }),
    onSuccess: () => {
      toast.success("Login Successful", {
        description: "Redirecting to dashboard...",
      });

      router.push(`/${RoutesEnum.BUSINESS}/dashboard`);
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

  const onSubmit = async (data: LoginFormInputs) => {
    mutate(data);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Login as Business
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign in to manage your business account
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="projectmayhem@fc.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <Button
          isLoading={isPending}
          className="cursor-pointer group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign in &rarr;
        </Button>

        <BottomGradient />

        <AuthRedirectText href={`/register/${RoutesEnum.BUSINESS}`} />

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
}
