import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Chrome } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useAuth } from "../lib/auth-context";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    setIsLoading(true);
    const ok = await login(email, password);
    setIsLoading(false);
    if (ok) {
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-8 shadow-[0_24px_60px_-40px_rgba(20,30,60,0.5)] backdrop-blur-xl">
      <div className="text-center">
        <span className="grid size-10 place-items-center rounded-xl bg-ink text-white mx-auto">
          <span className="text-lg font-bold">W</span>
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-custom">Log in to your WriteAI account</p>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-custom" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-custom" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(v === true)} />
            <Label htmlFor="remember" className="text-sm font-normal text-muted-custom">
              Remember me
            </Label>
          </div>
          <button type="button" className="text-sm text-brand hover:underline">
            Forgot password?
          </button>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full rounded-xl bg-ink py-3 text-white">
          {isLoading ? "Logging in…" : "Login"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-line" />
        </div>
        <span className="relative flex justify-center text-xs text-muted-custom">
          <span className="bg-white/70 px-2">or continue with</span>
        </span>
      </div>

      <Button
        variant="outline"
        type="button"
        onClick={() => toast.info("Google login is not connected in demo mode.")}
        className="w-full rounded-xl"
      >
        <Chrome className="mr-2 size-4" /> Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-muted-custom">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
