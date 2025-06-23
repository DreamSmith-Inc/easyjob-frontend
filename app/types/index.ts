export type UserType = {
  id: number;
  last_login: string; // ISO date string
  is_superuser: boolean;
  email: string;
  user_name: string;
  role: "student" | "admin" | "teacher"; // Add more roles as needed
  date_joined: string; // ISO date string (e.g., '2025-06-22')
};
