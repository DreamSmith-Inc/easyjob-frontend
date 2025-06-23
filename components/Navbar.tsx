import Link from "next/link";
import { Button } from "./ui/button";
import { RoutesEnum } from "@/lib/routes";

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <Link href={"/"}>
          <h1 className="text-base font-bold md:text-2xl">Easy Jobs</h1>
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <Button asChild>
          <Link
            href={`/login/${RoutesEnum.STUDENT}`}
            className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Student
          </Link>
        </Button>
        <Button asChild>
          <Link
            href={`/login/${RoutesEnum.BUSINESS}`}
            className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Business
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
