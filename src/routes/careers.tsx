import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Globe, Heart, Laptop, Rocket, Users, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Department = "All" | "Engineering" | "Design" | "Data" | "Sports" | "Operations";

type Role = {
  id: string;
  title: string;
  department: Department;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};

const roles: Role[] = [
  {
    id: "frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead the development of our core dashboard experience using React, TypeScript and modern CSS. You will own feature delivery from prototype to production, working closely with design and backend engineers.",
    requirements: [
      "5+ years with React and TypeScript in production",
      "Strong eye for animation, layout and accessibility",
      "Experience with data-heavy interfaces and real-time updates",
      "Comfortable with design systems and component libraries",
    ],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "London, UK",
    type: "Full-time",
    description:
      "Shape how millions of fans experience live sports. You will run end-to-end design for new features, from user research and wireframes through to high-fidelity UI and design QA.",
    requirements: [
      "3+ years of product design experience",
      "Portfolio showing complex web app work",
      "Familiarity with design systems in Figma",
      "Strong communication and storytelling skills",
    ],
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and maintain the pipelines that power live scores, stats and analytics. You will work with event streams, batch jobs and warehouses to keep data accurate and low-latency.",
    requirements: [
      "3+ years in data engineering or backend with heavy data focus",
      "Strong SQL and Python",
      "Experience with streaming platforms such as Kafka or Pulsar",
      "Understanding of sports data or similar live domains is a plus",
    ],
  },
  {
    id: "sports-analyst",
    title: "Sports Analyst",
    department: "Sports",
    location: "New York, US",
    type: "Contract",
    description:
      "Translate raw match data into editorial insight, feature ideas and product requirements. You will monitor live games, validate stats and collaborate with engineers on new visualisations.",
    requirements: [
      "Deep knowledge of at least two major sports leagues",
      "Strong writing and analytical skills",
      "Comfort with spreadsheets and basic data tools",
      "Ability to work irregular hours during live events",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Keep our infrastructure reliable, observable and scalable. You will own CI/CD, monitoring, incident response and cloud cost optimisation across multiple regions.",
    requirements: [
      "3+ years of DevOps or SRE experience",
      "Strong knowledge of Docker, Kubernetes and Terraform",
      "Experience with major cloud providers",
      "Scripting skills in Python, Bash or Go",
    ],
  },
  {
    id: "operations-manager",
    title: "Operations Manager",
    department: "Operations",
    location: "London, UK",
    type: "Full-time",
    description:
      "Run the day-to-day operations that keep the team fast and focused. You will manage vendor relationships, coordinate cross-functional projects and help shape internal processes.",
    requirements: [
      "4+ years in operations or programme management",
      "Experience in a high-growth tech environment",
      "Strong project management and communication skills",
      "Comfort with async collaboration across time zones",
    ],
  },
];

const benefits = [
  { icon: Globe, title: "Remote-first", description: "Work from anywhere with a reliable internet connection and overlap hours." },
  { icon: Laptop, title: "Home office budget", description: "Annual stipend for equipment, monitors, chairs and co-working spaces." },
  { icon: Heart, title: "Health and wellbeing", description: "Comprehensive health insurance, mental health support and fitness allowance." },
  { icon: Rocket, title: "Learning budget", description: "Annual budget for courses, conferences, books and mentorship programmes." },
  { icon: Users, title: "Team retreats", description: "Quarterly in-person meetups and an annual company offsite." },
  { icon: Briefcase, title: "Flexible time off", description: "Take the time you need, with minimum and maximum guidance only." },
];

const values = [
  { title: "Clarity over cleverness", description: "We prefer simple, readable solutions that are easy to build on." },
  { title: "Speed with craft", description: "We move fast, but never at the expense of quality or accessibility." },
  { title: "Data-informed", description: "We measure outcomes, validate assumptions and update quickly." },
  { title: "Fan obsession", description: "Every feature starts from a real fan need, not a vanity metric." },
];

const faqs = [
  { question: "Do you sponsor visas?", answer: "Yes, we sponsor work visas for qualified candidates in the UK, US and EU." },
  { question: "What is your interview process?", answer: "Typically an intro call, a take-home exercise, a panel interview and a final chat with leadership." },
  { question: "Do you hire interns?", answer: "We run a summer internship programme. Check back in January for openings." },
  { question: "What are your core hours?", answer: "We ask for a 4-hour overlap with the London or New York team, depending on your role." },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Sportcast" },
      {
        name: "description",
        content: "Join the Sportcast team and help build the future of live sports data and fan experiences.",
      },
      { property: "og:title", content: "Careers at Sportcast" },
      {
        property: "og:description",
        content: "We are hiring engineers, designers and sports enthusiasts.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [activeDept, setActiveDept] = useState<Department>("All");
  const [search, setSearch] = useState("");
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const departments: Department[] = ["All", "Engineering", "Design", "Data", "Sports", "Operations"];

  const filtered = roles.filter((r) => {
    const matchDept = activeDept === "All" || r.department === activeDept;
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  const openApplication = (role: Role) => {
    setSelectedRole(role);
    setSubmitted(false);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Application submitted", {
      description: `We received your application for ${selectedRole?.title}. We will be in touch soon.`,
    });
    setTimeout(() => setFormOpen(false), 1200);
  };

  return (
    <SiteShell>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-xs font-semibold">We are hiring</Badge>
            <span className="text-xs text-muted-foreground">Last updated: Aug 2026</span>
          </div>
          <h1 className="mt-4 animate-fade-up font-display text-4xl font-bold sm:text-5xl">Careers</h1>
          <p className="mt-3 max-w-2xl animate-fade-up text-muted-foreground">
            Help us build the most trusted live sports dashboard. We are a small, fast-moving team that
            cares deeply about craft, clarity and speed.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Team members", value: "48+" },
              { label: "Countries", value: "14" },
              { label: "Open roles", value: `${roles.length}` },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 text-center">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <Tabs value={activeDept} onValueChange={(v) => setActiveDept(v as Department)} className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              {departments.map((dept) => (
                <TabsTrigger key={dept} value={dept} className="text-xs">
                  {dept}
                </TabsTrigger>
              ))}
            </TabsList>
            <Input
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-xs"
            />
          </div>

          {departments.map((dept) => (
            <TabsContent key={dept} value={dept} className="space-y-4">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground">No roles match your filters right now.</p>
              ) : (
                <Accordion
                  type="single"
                  collapsible
                  value={openJobId ?? undefined}
                  onValueChange={(v) => setOpenJobId(v || null)}
                >
                  {filtered.map((role) => (
                    <AccordionItem key={role.id} value={role.id} className="rounded-2xl border border-border">
                      <AccordionTrigger className="px-5">
                        <div className="flex flex-1 flex-col gap-1 text-left sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-display text-base font-bold">{role.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {role.department} · {role.location} · {role.type}
                            </p>
                          </div>
                          <Badge variant="outline" className="shrink-0 text-[10px] font-semibold uppercase tracking-widest">
                            {role.department}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5">
                        <div className="grid gap-6 md:grid-cols-3">
                          <div className="md:col-span-2 space-y-4">
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                Requirements
                              </p>
                              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                                {role.requirements.map((req) => (
                                  <li key={req}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="rounded-xl border border-border bg-surface/40 p-4 text-sm">
                              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Location</p>
                              <p className="mt-1 font-semibold">{role.location}</p>
                            </div>
                            <div className="rounded-xl border border-border bg-surface/40 p-4 text-sm">
                              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Employment</p>
                              <p className="mt-1 font-semibold">{role.type}</p>
                            </div>
                            <Dialog open={formOpen && selectedRole?.id === role.id} onOpenChange={setFormOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  className="w-full"
                                  onClick={() => openApplication(role)}
                                >
                                  Apply now <ArrowRight className="size-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Apply for {role.title}</DialogTitle>
                                </DialogHeader>
                                {!submitted ? (
                                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Full name</Label>
                                      <Input id="name" required placeholder="Jane Doe" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <Input id="email" type="email" required placeholder="jane@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="resume">Resume link</Label>
                                      <Input id="resume" required placeholder="https://..." />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="note">Why Sportcast?</Label>
                                      <Textarea id="note" rows={4} placeholder="Tell us in a few sentences..." />
                                    </div>
                                    <Button type="submit" className="w-full">Submit application</Button>
                                  </form>
                                ) : (
                                  <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <p className="font-display text-xl font-bold">Application received</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                      Thanks for applying. We will review and reply within 5 business days.
                                    </p>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface/40 p-8">
            <h2 className="font-display text-2xl font-bold">Why Sportcast?</h2>
            <div className="mt-6 grid gap-5">
              {benefits.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/40 p-8">
            <h2 className="font-display text-2xl font-bold">Values</h2>
            <div className="mt-6 space-y-5">
              {values.map((item) => (
                <div key={item.title}>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteShell>
  );
}
