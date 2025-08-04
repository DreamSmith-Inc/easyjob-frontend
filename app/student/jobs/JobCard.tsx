import {
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StudentJobPosting } from "@/app/types";

function StudentJobCard({ job }: { job: StudentJobPosting }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSalary = (salary: string) => {
    return `₹${Number.parseFloat(salary).toLocaleString("en-IN")}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-gray-900">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{job.business_name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {job.is_active && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 border-green-200"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            )}
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              {job.timing}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-green-600">
              {formatSalary(job.salary)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Posted {formatDate(job.date_posted)}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Job Description
            </h4>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
            <p className="text-gray-700">{job.requirements}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t bg-gray-50/50">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-gray-500">Job ID: #{job.id}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Save Job
            </Button>
            <Button size="sm">Apply Now</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default StudentJobCard;
