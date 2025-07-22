export type UserType = {
  id: number;
  last_login: string; // ISO date string
  is_superuser: boolean;
  email: string;
  firstname: string;
  lastname: string;
  user_name: string;
  role: "student" | "business";
  date_joined: string; // ISO date string (e.g., '2025-06-22')
};

export interface JobPosting {
  id: string;
  title: string;
  business_name: string;
  location: string;
  requirements: string;
  salary: string;
  applications: number;
  is_active: string;
  date_posted: Date;
  timing: string;
  description: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
