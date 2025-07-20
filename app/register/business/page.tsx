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
import AuthRedirectText from "@/components/forms/AuthRedirectText";
import { RoutesEnum } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type SignupFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
  username: string;
};

export default function BusinessSignup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignupFormInputs) =>
      axiosInstance.post("/auth/register/business", data),
    onSuccess: () => {
      toast.success("Registration Successful", {
        description: "Welcome! Please login...",
      });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as { detail?: string })?.detail ||
        "Something went wrong. Please try again.";

      toast.error("Registration Failed", {
        description: message,
      });

      console.error("Registraion error:", error);
    },
  });

  const onSubmit = async (data: SignupFormInputs) => {
    const body: SignupFormInputs = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      password2: data.password2,
      // @ts-expect-error
      user_name: data.username,
    };

    mutate(body);
  };

  const password = watch("password");

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Create Business Account
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Register your business to find talent
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="projectmayhem"
            type="text"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.username?.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password2">Verify Password</Label>
          <Input
            id="password2"
            placeholder="••••••••"
            type="password"
            {...register("password2", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.password2 && (
            <p className="text-sm text-red-500">{errors.password2.message}</p>
          )}
        </LabelInputContainer>

        <Button
          isLoading={isPending}
          className="cursor-pointer group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
        </Button>

        <BottomGradient />

        <AuthRedirectText
          label="Not have an account? Login"
          href={`/login/${RoutesEnum.BUSINESS}`}
        />

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
}
