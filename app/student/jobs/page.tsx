import { JobCard } from "./JobCard";

const sampleJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    description:
      "We're looking for an experienced frontend developer to join our team and help build the next generation of web applications using React, TypeScript, and modern web technologies.",
    postedDate: "2 days ago",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description:
      "Join our creative team to design beautiful and intuitive user experiences. You'll work closely with developers and product managers to bring ideas to life.",
    postedDate: "1 week ago",
    skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "DataFlow Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $150k",
    description:
      "Build scalable backend systems and APIs that power our data processing platform. Experience with cloud technologies and microservices architecture preferred.",
    postedDate: "3 days ago",
    skills: ["Node.js", "Python", "AWS", "PostgreSQL", "Docker"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    title: "Marketing Manager",
    company: "Growth Co.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$70k - $95k",
    description:
      "Lead our marketing efforts and drive user acquisition through various channels. Experience with digital marketing, content creation, and analytics required.",
    postedDate: "5 days ago",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Contract",
    salary: "$130k - $170k",
    description:
      "Help us build and maintain our cloud infrastructure. You'll work with Kubernetes, CI/CD pipelines, and monitoring systems to ensure reliable deployments.",
    postedDate: "1 day ago",
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Monitoring"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "11",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    description:
      "We're looking for an experienced frontend developer to join our team and help build the next generation of web applications using React, TypeScript, and modern web technologies.",
    postedDate: "2 days ago",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "22",
    title: "Product Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description:
      "Join our creative team to design beautiful and intuitive user experiences. You'll work closely with developers and product managers to bring ideas to life.",
    postedDate: "1 week ago",
    skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "33",
    title: "Backend Engineer",
    company: "DataFlow Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $150k",
    description:
      "Build scalable backend systems and APIs that power our data processing platform. Experience with cloud technologies and microservices architecture preferred.",
    postedDate: "3 days ago",
    skills: ["Node.js", "Python", "AWS", "PostgreSQL", "Docker"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "44",
    title: "Marketing Manager",
    company: "Growth Co.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$70k - $95k",
    description:
      "Lead our marketing efforts and drive user acquisition through various channels. Experience with digital marketing, content creation, and analytics required.",
    postedDate: "5 days ago",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "55",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Contract",
    salary: "$130k - $170k",
    description:
      "Help us build and maintain our cloud infrastructure. You'll work with Kubernetes, CI/CD pipelines, and monitoring systems to ensure reliable deployments.",
    postedDate: "1 day ago",
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Monitoring"],
    logo: "/placeholder.svg?height=32&width=32",
  },
];

export default async function page() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
        <p className="text-muted-foreground">
          Discover opportunities that match your skills and interests
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {sampleJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
