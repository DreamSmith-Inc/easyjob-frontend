"use client";

import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/time-picker";
import { DatePicker } from "@/components/ui/date-picker";
import { useEffect } from "react";
import { JobPosting } from "@/app/types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function EditPageClient({
  initialJob: job,
}: {
  initialJob: JobPosting;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<JobPosting>();

  useEffect(() => {
    if (job) {
      reset({
        title: job.title ?? "",
        business_name: job.business_name ?? "",
        timing: job.timing ?? null,
        location: job.location ?? "",
        salary: job.salary ?? "",
        date_posted: job.date_posted ?? null,
        description: job.description ?? "",
        requirements: job.requirements ?? "",
      });
    }
  }, [job, reset]);

  const updateJobMutation = useMutation({
    mutationFn: (data: JobPosting) =>
      axiosInstance.put(`/business/jobposting/${job.id}/`, data),
    onSuccess: () => {
      toast.success("Success", { description: "Job updated!" });
      queryClient.invalidateQueries({ queryKey: ["job", job.id] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as { detail?: string })?.detail ||
        "Something went wrong. Please try again.";

      toast.error(message);
      console.error("Registraion error:", error);
    },
  });

  const onSubmit = (data: JobPosting) => {
    updateJobMutation.mutate(data);
  };

  return (
    <Card className="px-6">
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
                <TimePicker
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                />
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
                <DatePicker
                  // @ts-ignore
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the role..."
            className="min-h-[120px]"
            {...register("description")}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            placeholder="List key qualifications..."
            className="min-h-[100px]"
            {...register("requirements")}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting || updateJobMutation.isPending}
          >
            Update Job
          </Button>
        </div>
      </form>
    </Card>
  );
}
