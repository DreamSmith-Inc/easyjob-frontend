import React from "react";
import PostJobDialog from "./PostJobDialog";

export default function JobsTitle() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Job Openings</h2>
        <p className="text-muted-foreground">
          Manage your company&apos;s job postings
        </p>
      </div>
      <PostJobDialog />
    </div>
  );
}
