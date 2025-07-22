"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/time-picker";
import { Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { JobPosting } from "@/app/types";

export default function PostJobDialog() {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: JobPosting) =>
      axiosInstance.post("/business/jobposting/", data),
    onSuccess: () => {
      toast.success("Success", {
        description: "Your job has been posted!",
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

  const { register, handleSubmit, control, reset } = useForm<JobPosting>({
    defaultValues: {
      title: "",
      business_name: "",
      timing: "",
      location: "",
      salary: "",
      description: "",
      requirements: "",
      date_posted: new Date(),
    },
  });

  const onSubmit = (data: JobPosting) => {
    mutate(data);
    setOpen(false);
    reset(); // optional: reset form on close
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Fill out the details below to post a new job opening.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="e.g. Senior Frontend Developer"
              {...register("title")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="business_name">Business Name</Label>
              <Input id="business_name" {...register("business_name")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timing">Timing</Label>
              <Controller
                control={control}
                name="timing"
                render={({ field }) => (
                  <TimePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. San Francisco, CA"
                {...register("location")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                placeholder="e.g. $80,000 - $120,000"
                {...register("salary")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Start Date</Label>
              <Controller
                control={control}
                name="date_posted"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities, and requirements..."
              className="min-h-[120px]"
              {...register("description")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="List the key requirements and qualifications..."
              className="min-h-[100px]"
              {...register("requirements")}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              isLoading={isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Post Job</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
