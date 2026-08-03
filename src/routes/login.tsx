import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout, fieldClass } from "@/components/auth-layout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in to Sportcast" },
      { name: "description", content: "Sign in to your Sportcast account for personalised live scores and stats." },
      { property: "og:title", content: "Log in to Sportcast" },
      { property: "og:description", content: "Access your personalised sports dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("fan@sportcast.app");
  const [password, setPassword] = useState("sportcast");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      toast.error("Enter a valid email and a password of at least 6 characters");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email);
      toast.success("Welcome back to Sportcast");
      navigate({ to: "/dashboard" });
    }, 500);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up your live feed where you left off."
      footer={
        <>
          New to Sportcast?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Email
          </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={fieldClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={fieldClass}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Demo account is pre-filled — just hit log in.
        </p>
      </form>
    </AuthLayout>
  );
}
