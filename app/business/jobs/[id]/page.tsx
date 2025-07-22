import {
  ArrowLeft,
  Bookmark,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getAuthenticatedAxios } from "@/lib/authenticatedAxios";
import React from "react";
import { JobPosting } from "@/app/types";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const axios = await getAuthenticatedAxios();

  const res = await axios.get(`/business/jobposting/${id}`);
  const job = (await res.data) as JobPosting;

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/business/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to jobs
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={"/placeholder.svg"} alt={"Company"} />
                    <AvatarFallback>{"Company".substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{"Company"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Save job</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share job</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.timing}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {job.salary}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Posted {format(job.date_posted, "dd MM yyyy")}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="space-y-4 pt-4">
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />

                  <h3 className="text-lg font-semibold mt-6">
                    Responsibilities
                  </h3>
                  {/* <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul> */}
                </TabsContent>
                <TabsContent value="requirements" className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold">Requirements</h3>
                  {/* <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul> */}
                </TabsContent>
                <TabsContent value="benefits" className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold">Benefits</h3>
                  {/* <ul className="list-disc pl-5 space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul> */}
                </TabsContent>
              </Tabs>
            </CardContent>

            <Separator />

            <CardFooter className="flex justify-between pt-6">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Application Deadline:</span>{" "}
                {format(job.timing, "dd MM yyyy")}
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Save for Later</Button>
                <Button>Apply Now</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Company Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={"/placeholder.svg"} alt={"Company"} />
                  <AvatarFallback>{"Company".substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{"Company"}</h3>
                  <p className="text-sm text-muted-foreground">Technology</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm hover:underline">
                    Visit Website
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">100-250 employees</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">About the company</h3>
                <p className="text-sm text-muted-foreground">
                  Acme Inc is a leading technology company focused on building
                  innovative solutions for businesses. Founded in 2010,
                  we`&apos;ve grown to over 200 employees across 5 global
                  offices.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-transparent">
                View Company Profile
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Similar Jobs</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>CO</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Frontend Developer</h3>
                    <p className="text-sm text-muted-foreground">Company {i}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Remote
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        $100k-$130k
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Similar Jobs
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
