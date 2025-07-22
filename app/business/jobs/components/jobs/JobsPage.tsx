import React from "react";
import JobsPageClient from "./JobsPageClient";
import { getAuthenticatedAxios } from "@/lib/authenticatedAxios";

export default async function JobsPage() {
  const axios = await getAuthenticatedAxios();

  const res = await axios.get(`/business/jobposting`);
  const data = await res.data;

  return <JobsPageClient initialJobs={data} />;
}
