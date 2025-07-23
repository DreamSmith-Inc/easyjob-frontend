import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, Clock, DollarSign, Bookmark } from "lucide-react";
import Image from "next/image";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    postedDate: string;
    skills: string[];
    logo?: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              {job.logo ? (
                <Image
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  width={100}
                  height={100}
                  className="w-8 h-8 rounded"
                />
              ) : (
                <Building2 className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight">
                {job.title}
              </h3>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {job.type}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {job.salary}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="pt-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-muted-foreground">
            Posted {job.postedDate}
          </span>
          <Button variant="secondary" size="sm">
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
