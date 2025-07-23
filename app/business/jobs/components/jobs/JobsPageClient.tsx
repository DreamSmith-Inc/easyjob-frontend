"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Search,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { JobPosting, PaginatedResponse } from "@/app/types";
import Link from "next/link";
import DeleteJob from "./DeleteJob";
import { format } from "date-fns";

interface jobsPageClientProps {
  initialJobs: PaginatedResponse<JobPosting>;
}

export default function JobsPageClient({ initialJobs }: jobsPageClientProps) {
  const [jobs, setJobs] = useState<PaginatedResponse<JobPosting>>(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const removeJobFromList = (jobId: string) => {
    setJobs((prev) => ({
      ...prev,
      results: prev.results.filter((job) => job.id !== jobId),
    }));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);

      const res = await axiosInstance(
        `/business/jobposting?${params.toString()}`
      );
      const data = await res.data;
      setJobs(data || []);
    };

    if (debouncedSearchTerm) {
      fetchJobs();
    } else {
      setJobs(initialJobs);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="space-y-6">
      {/* Search Box */}

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs..."
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.results.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <Badge variant={job.is_active ? "default" : "secondary"}>
                      {job.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {job.business_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.timing}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Posted {format(job.date_posted, "dd MM yyyy")}
                    </span>
                    {/* <span className="font-medium">
                      {job.applications} applications
                    </span> */}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`./jobs/${job.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`./jobs/edit/${job.id}`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Job
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      View Applications
                    </DropdownMenuItem>
                    <DeleteJob
                      id={job.id}
                      onSuccess={() => removeJobFromList(job.id)}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
