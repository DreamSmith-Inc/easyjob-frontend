import StatusCards from "./components/StatusCards";
import JobsTitle from "./components/jobs/JobsTitle";
import JobsPage from "./components/jobs/JobsPage";

export default async function page() {
  return (
    <div className="container mx-auto px-6">
      <StatusCards />
      <div className="space-y-4">
        <JobsTitle />

        <JobsPage />
      </div>
    </div>
  );
}
