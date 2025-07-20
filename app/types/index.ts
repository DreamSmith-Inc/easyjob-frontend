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
