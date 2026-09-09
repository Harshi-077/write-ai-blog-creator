import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoginForm } from "../components/login-form";
import { useAuth } from "../lib/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — WriteAI" },
      { name: "description", content: "Log in to your WriteAI account." },
      { property: "og:title", content: "Login — WriteAI" },
      { property: "og:description", content: "Log in to your WriteAI account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-frost px-4">
      <LoginForm />
    </div>
  );
}
