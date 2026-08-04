import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, LogOut, Star, Trash2, Bell, User, Shield, Palette } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/auth";
import { teams, leagueToken } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  loader: () => {
    return {};
  },
  head: () => ({
    meta: [
      { title: "Settings | Sportcast" },
      { name: "description", content: "Manage your profile, preferences and followed teams." },
      { property: "og:title", content: "Settings | Sportcast" },
      { property: "og:description", content: "Manage your profile, preferences and followed teams." },
    ],
  }),
  component: SettingsPage,
});

type Preferences = {
  liveAlerts: boolean;
  matchReminders: boolean;
  newsDigest: boolean;
  playerUpdates: boolean;
  darkMode: boolean;
};

const defaultPrefs: Preferences = {
  liveAlerts: true,
  matchReminders: true,
  newsDigest: false,
  playerUpdates: false,
  darkMode: true,
};

function SettingsPage() {
  const { user, ready, signOut, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useState<Preferences>(defaultPrefs);
  const [saving, setSaving] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      const raw = localStorage.getItem("sportcast.prefs");
      if (raw) {
        try {
          setPrefs({ ...defaultPrefs, ...JSON.parse(raw) });
        } catch {
          setPrefs(defaultPrefs);
        }
      }
    }
  }, [user]);

  if (!ready || !user) {
    return (
      <SiteShell ticker={false} footer={false}>
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-muted-foreground">
          Loading settings...
        </div>
      </SiteShell>
    );
  }

  const followedTeams = teams.filter((t) => user.favorites.includes(t.id));
  const otherTeams = teams.filter((t) => !user.favorites.includes(t.id));

  const updatePref = (key: keyof Preferences, value: boolean) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    localStorage.setItem("sportcast.prefs", JSON.stringify(next));
  };

  const saveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      const updated = { ...user, name: name.trim() || user.name, email: email.trim() || user.email };
      localStorage.setItem("sportcast.user", JSON.stringify(updated));
      toast.success("Profile updated");
      setSaving(false);
    }, 600);
  };

  const handleLogout = () => {
    signOut();
    navigate({ to: "/" });
  };

  const toggleTeam = (teamId: string) => {
    toggleFavorite(teamId);
    toast.success("Teams updated");
  };

  return (
    <SiteShell ticker={false}>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link
            to="/dashboard"
            className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" /> Back to Dashboard
          </Link>
          <h1 className="mt-4 animate-fade-up font-display text-4xl font-bold sm:text-5xl">Settings</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            Manage your profile, notification preferences and followed teams.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <User className="size-5 text-primary" />
                <h2 className="font-display text-xl font-bold">Profile</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Display name
                  </label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Email
                  </label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-full text-lg font-bold text-primary-foreground"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  {(name.trim() || user.name).charAt(0).toUpperCase()}
                </span>
                <p className="text-sm text-muted-foreground">
                  {name.trim() || user.name} · {email.trim() || user.email}
                </p>
              </div>
              <div className="mt-6">
                <Button onClick={saveProfile} disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Bell className="size-5 text-primary" />
                <h2 className="font-display text-xl font-bold">Notifications</h2>
              </div>
              <div className="mt-6 space-y-5">
                {([
                  { key: "liveAlerts", label: "Live match alerts", desc: "Get notified when followed matches go live." },
                  { key: "matchReminders", label: "Match reminders", desc: "Receive reminders 30 minutes before kick-off." },
                  { key: "newsDigest", label: "Daily news digest", desc: "A daily email with top stories from your leagues." },
                  { key: "playerUpdates", label: "Player updates", desc: "Alerts for injuries, transfers and standout performances." },
                  { key: "darkMode", label: "Dark mode", desc: "Use dark theme across the app." },
                ] as const).map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch checked={prefs[item.key]} onCheckedChange={(v) => updatePref(item.key, v)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Shield className="size-5 text-primary" />
                <h2 className="font-display text-xl font-bold">Account</h2>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={() => setLogoutOpen(true)}
                  className="flex items-center gap-2"
                >
                  <LogOut className="size-4" /> Log out
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    localStorage.removeItem("sportcast.user");
                    localStorage.removeItem("sportcast.prefs");
                    toast.success("Account data cleared");
                    navigate({ to: "/" });
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="size-4" /> Delete local data
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Star className="size-5 text-primary" />
                <h2 className="font-display text-xl font-bold">Followed teams</h2>
              </div>
              <div className="mt-4 space-y-2">
                {followedTeams.length === 0 && (
                  <p className="text-sm text-muted-foreground">You are not following any teams yet.</p>
                )}
                {followedTeams.map((t) => {
                  const accent = leagueToken[t.league];
                  return (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-surface/40 px-3 py-2.5"
                    >
                      <Link to={`/teams/${t.id}`} className="flex items-center gap-3">
                        <span className="text-lg">{t.emoji}</span>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-[11px] text-muted-foreground">{t.league}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => toggleTeam(t.id)}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-xl font-bold">Add teams</h2>
              <div className="mt-4 space-y-2">
                {otherTeams.map((t) => {
                  const accent = leagueToken[t.league];
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTeam(t.id)}
                      className="flex w-full items-center justify-between rounded-xl border border-border px-3 py-2.5 text-left transition-colors hover:border-primary/40"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{t.emoji}</span>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-[11px] text-muted-foreground">{t.league}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-primary">Follow</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>You will be signed out of your Sportcast account.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SiteShell>
  );
}
