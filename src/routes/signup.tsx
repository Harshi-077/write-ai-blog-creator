import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SignupForm } from "../components/signup-form";
import { useAuth } from "../lib/auth-context";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — WriteAI" },
      { name: "description", content: "Create your WriteAI account." },
      { property: "og:title", content: "Sign Up — WriteAI" },
      { property: "og:description", content: "Create your WriteAI account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-frost px-4">
      <SignupForm />
    </div>
  );
}
