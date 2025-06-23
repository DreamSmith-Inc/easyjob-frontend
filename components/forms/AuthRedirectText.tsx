"use client";

import Link from "next/link";

interface AuthRedirectTextProps {
  label?: string;
  linkText?: string;
  href: string;
}

export default function AuthRedirectText({
  label = "Not have an account? Register",
  linkText = "here",
  href,
}: AuthRedirectTextProps) {
  return (
    <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
      {label}{" "}
      <Link href={href} className="text-blue-500 underline">
        {linkText}
      </Link>
    </p>
  );
}
