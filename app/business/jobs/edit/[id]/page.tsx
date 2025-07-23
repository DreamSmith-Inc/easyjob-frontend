import { getAuthenticatedAxios } from "@/lib/authenticatedAxios";
import { JobPosting } from "@/app/types";
import EditPageClient from "./EditPageClient";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const axios = await getAuthenticatedAxios();

  const res = await axios.get(`/business/jobposting/${id}`);
  const job = (await res.data) as JobPosting;

  return <EditPageClient initialJob={job} />;
}
