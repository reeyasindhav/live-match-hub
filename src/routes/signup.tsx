import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout, fieldClass } from "@/components/auth-layout";
import { useAuth } from "@/lib/auth";
import { leagues } from "@/lib/mock-data";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Sportcast account" },
      {
        name: "description",
        content: "Sign up for Sportcast to follow teams, get live match alerts and a personalised stats feed.",
      },
      { property: "og:title", content: "Create your Sportcast account" },
      { property: "og:description", content: "Follow teams and build your personalised sports feed." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picked, setPicked] = useState<string[]>(["NBA"]);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@") || password.length < 6) {
      toast.error("Fill in your name, a valid email and a 6+ character password");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email, name);
      toast.success("Account created — welcome to Sportcast");
      navigate({ to: "/dashboard" });
    }, 500);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Pick your leagues and get a feed built around your teams."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Full name
          </label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} placeholder="Alex Fan" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
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
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Favourite leagues
          </p>
          <div className="flex flex-wrap gap-2">
            {leagues.map((l) => {
              const on = picked.includes(l);
              return (
                <button
                  type="button"
                  key={l}
                  onClick={() => setPicked((p) => (on ? p.filter((x) => x !== l) : [...p, l]))}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    on ? "bg-primary text-primary-foreground" : "border border-border bg-surface text-muted-foreground"
                  }`}
                >
                  {l === "PREMIER LEAGUE" ? "EPL" : l}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
