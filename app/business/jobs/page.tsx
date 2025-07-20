import StatusCards from "./components/StatusCards";
import JobsSection from "./components/JobsSection";
import Filters from "./components/Filters";
import JobsTitle from "./components/JobsTitle";

export default async function page() {
  return (
    <div className="container mx-auto px-6">
      <StatusCards />
      <div className="space-y-4">
        <JobsTitle />

        <Filters />
        <JobsSection />
      </div>
    </div>
  );
}
