// lib/authenticatedAxios.ts
import axios from "axios";
import { cookies } from "next/headers";

export async function getAuthenticatedAxios() {
  const cookieStore = await cookies();

  const access = cookieStore.get("access_token")?.value;
  const refresh = cookieStore.get("refresh_token")?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: access ? `Bearer ${access}` : "",
      Cookie: `access_token=${access}; refresh_token=${refresh}`,
    },
    withCredentials: true,
  });

  return instance;
}
