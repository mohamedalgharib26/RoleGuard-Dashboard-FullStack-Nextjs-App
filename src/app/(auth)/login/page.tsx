// app/login/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm"; // Client Component

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const role = session.user.role;
    if (role === "Admin") redirect("/todos");
    else if (role === "Moderator") redirect("/products");
    else redirect("/users");
  }

  return <LoginForm />; // Only render Client Component if no session
}
