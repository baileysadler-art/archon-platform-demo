import {
  Shield,
  ShieldCheck,
  Activity,
  Search,
  Lock,
  Brain,
  ArrowRight,
  Check,
  Zap,
  Eye,
  Scale,
  ChevronRight,
  AlertTriangle,
  BarChart3,
  FileWarning,
  MonitorSmartphone,
  Plug,
  LayoutDashboard,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[oklch(0.1_0.02_200/0.8)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-[oklch(0.7_0.18_185)]" />
          <span className="text-xl font-bold tracking-tight text-white">
            Archon AI
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-white/60 transition hover:text-white"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Pricing
          </a>
        </div>
        <a
          href="#pricing"
          className="rounded-lg bg-[oklch(0.7_0.18_185)] px-5 py-2.5 text-sm font-semibold text-[oklch(0.1_0.02_200)] transition hover:bg-[oklch(0.75_0.16_185)]"
        >
          Start Free Trial
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-orb-1 absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[oklch(0.5_0.15_185/0.12)] blur-[120px]" />
        <div className="hero-orb-2 absolute top-40 left-0 h-[400px] w-[400px] rounded-full bg-[oklch(0.5_0.12_260/0.08)] blur-[100px]" />
        <div className="hero-orb-3 absolute top-60 right-0 h-[300px] w-[300px] rounded-full bg-[oklch(0.6_0.15_185/0.06)] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="hero-fade-up hero-delay-1 mb-8 inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.18_185/0.3)] bg-[oklch(0.7_0.18_185/0.1)] px-4 py-1.5 text-sm text-[oklch(0.7_0.18_185)]">
            <ShieldCheck className="h-4 w-4" />
            AI security on autopilot
          </div>

          {/* Headline */}
          <h1 className="hero-fade-up hero-delay-2 text-4xl leading-[1.1] font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Secure your AI.{" "}
            <span className="hero-gradient-text bg-gradient-to-r from-[oklch(0.7_0.18_185)] to-[oklch(0.7_0.15_220)] bg-clip-text text-transparent">
              Automatically.
            </span>
          </h1>

          {/* Subhead */}
          <p className="hero-fade-up hero-delay-3 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
            The platform that continuously scans, monitors, and protects your AI
            systems for vulnerabilities, bias, and compliance gaps. No manual
            audits. No waiting.
          </p>

          {/* CTAs */}
          <div className="hero-fade-up hero-delay-4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.7_0.18_185)] px-8 py-4 text-base font-semibold text-[oklch(0.1_0.02_200)] transition hover:bg-[oklch(0.75_0.16_185)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              See How It Works
            </a>
          </div>

          {/* Trust line */}
          <div className="hero-fade-up hero-delay-5 mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[oklch(0.7_0.18_185)]" />
              EU AI Act Ready
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[oklch(0.7_0.18_185)]" />
              ISO 42001 Aligned
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[oklch(0.7_0.18_185)]" />
              NIST AI RMF
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[oklch(0.7_0.18_185)]" />
              Setup in Minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      stat: "77%",
      label:
        "of organisations lack essential AI security practices (Accenture 2025)",
    },
    {
      icon: FileWarning,
      stat: "$4.88M",
      label:
        "average cost of a data breach, and AI makes it worse (IBM 2024)",
    },
    {
      icon: Scale,
      stat: "2026",
      label:
        "EU AI Act is coming into force. Non-compliance fines reach up to 7% of global revenue",
    },
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            AI is moving fast.
            <br />
            <span className="text-white/40">Security isn&apos;t keeping up.</span>
          </h2>
          <p className="mt-4 text-lg text-white/40">
            Companies are racing to deploy AI but most have no way to check if
            it&apos;s actually secure, fair, or compliant.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition hover:border-white/10 hover:bg-white/[0.04]"
            >
              <p.icon className="mb-4 h-8 w-8 text-[oklch(0.7_0.15_50)]" />
              <div className="text-4xl font-bold text-white">{p.stat}</div>
              <p className="mt-2 text-base leading-relaxed text-white/40">
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "Vulnerability Scanning",
      description:
        "Automated testing for prompt injection, data leaks, and model manipulation. The platform attacks your AI the way a hacker would, so you can fix the gaps first.",
    },
    {
      icon: Brain,
      title: "Bias Detection",
      description:
        "Continuous monitoring for hidden biases that could trigger lawsuits, lost customers, or front-page scandals. Get real-time alerts when fairness drifts.",
    },
    {
      icon: Lock,
      title: "Data Privacy Protection",
      description:
        "Automatically track where your AI touches personal data and flag compliance risks against GDPR, CCPA, and the EU AI Act.",
    },
    {
      icon: Activity,
      title: "Performance Monitoring",
      description:
        "Catch model drift, hallucination spikes, and latency creep before your users notice. Real-time dashboards and alerts keep you in control.",
    },
    {
      icon: Scale,
      title: "Compliance Dashboard",
      description:
        "One view across EU AI Act, NIST AI RMF, and ISO 42001. See exactly where you stand and what you need to fix, always up to date.",
    },
    {
      icon: Eye,
      title: "Supply Chain Risk",
      description:
        "Every third-party model, API, and dataset you rely on is tracked and risk-scored automatically. Nothing slips through unnoticed.",
    },
  ];

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-sm font-semibold tracking-widest uppercase text-[oklch(0.7_0.18_185)]">
            Platform Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Everything you need to secure AI.<br className="hidden md:block" />{" "}
            One platform.
          </h2>
          <p className="mt-4 text-lg text-white/40">
            Plug in your AI systems and get continuous, automated security
            coverage across every risk area.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((s, i) => (
            <div
              key={i}
              className="group bg-[oklch(0.13_0.02_200)] p-8 transition hover:bg-[oklch(0.15_0.025_200)]"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[oklch(0.7_0.18_185/0.1)] p-2.5">
                <s.icon className="h-5 w-5 text-[oklch(0.7_0.18_185)]" />
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect Your AI",
      description:
        "Plug in your AI systems through our API or one-click integrations. Works with any LLM, chatbot, or AI pipeline. Setup takes minutes, not weeks.",
      icon: Plug,
    },
    {
      step: "02",
      title: "Automated Scan",
      description:
        "The platform runs a full security scan across all six risk areas: vulnerabilities, bias, privacy, performance, compliance, and supply chain.",
      icon: Search,
    },
    {
      step: "03",
      title: "Live Dashboard",
      description:
        "See every risk scored and prioritised in real time. Get a clear view of what needs fixing, with actionable steps for each issue.",
      icon: LayoutDashboard,
    },
    {
      step: "04",
      title: "Continuous Monitoring",
      description:
        "Your AI systems are monitored 24/7. New vulnerabilities, drift, or compliance changes trigger instant alerts so nothing goes unnoticed.",
      icon: RefreshCw,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-sm font-semibold tracking-widest uppercase text-[oklch(0.7_0.18_185)]">
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            From connected to protected in minutes
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-black text-white/[0.04]">
                {s.step}
              </div>
              <div className="mt-2 mb-3 inline-flex rounded-lg bg-[oklch(0.7_0.18_185/0.1)] p-2.5">
                <s.icon className="h-5 w-5 text-[oklch(0.7_0.18_185)]" />
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "85-90%", label: "Gross Margins" },
    { value: "24/7", label: "Continuous Monitoring" },
    { value: "<5 min", label: "Setup Time" },
    { value: "100%", label: "Automated Scanning" },
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-[oklch(0.7_0.18_185/0.05)] to-transparent p-12 md:p-16">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white md:text-5xl">
                  {s.value}
                </div>
                <p className="mt-2 text-sm text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg leading-relaxed italic text-white/50">
            &ldquo;We were spending weeks on manual AI security reviews. Archon
            does it continuously and catches things we never would have found.
            It&apos;s the difference between a snapshot and a live feed.&rdquo;
          </p>
          <div className="mt-6">
            <div className="text-sm font-semibold text-white">Sarah Chen</div>
            <div className="text-sm text-white/30">
              CTO, Meridian Financial
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "750",
      period: "/month",
      description:
        "For teams getting started with AI security. Connect up to 3 AI systems and get continuous protection.",
      features: [
        "Up to 3 AI systems",
        "Automated vulnerability scanning",
        "Bias detection",
        "Compliance dashboard",
        "Weekly scan reports",
        "Email support",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "2,000",
      period: "/month",
      description:
        "For growing teams with multiple AI systems. Full scanning, real-time monitoring, and priority support.",
      features: [
        "Up to 15 AI systems",
        "All six security areas",
        "Real-time monitoring and alerts",
        "Supply chain risk tracking",
        "Custom compliance reports",
        "Priority support",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Business",
      price: "4,500",
      period: "/month",
      description:
        "For enterprises running AI at scale. Unlimited systems, advanced analytics, and dedicated support.",
      features: [
        "Unlimited AI systems",
        "Advanced threat analytics",
        "Custom integrations and API access",
        "Multi-team dashboards",
        "Dedicated account manager",
        "SLA-backed uptime guarantee",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-sm font-semibold tracking-widest uppercase text-[oklch(0.7_0.18_185)]">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-lg text-white/40">
            Start with a 14-day free trial. No credit card required. Cancel
            anytime.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-[oklch(0.7_0.18_185/0.4)] bg-[oklch(0.7_0.18_185/0.05)]"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[oklch(0.7_0.18_185)] px-4 py-1 text-xs font-semibold text-[oklch(0.1_0.02_200)]">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-sm text-white/40">&pound;</span>
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-white/40">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                {plan.description}
              </p>

              <a
                href="mailto:hello@archon-ai.com"
                className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-[oklch(0.7_0.18_185)] text-[oklch(0.1_0.02_200)] hover:bg-[oklch(0.75_0.16_185)]"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-8 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.7_0.18_185)]" />
                    <span className="text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enterprise callout */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
          <h3 className="text-lg font-semibold text-white">Enterprise</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/40">
            Need custom integrations, on-premise deployment, or dedicated
            infrastructure? We build around your requirements.
          </p>
          <a
            href="mailto:hello@archon-ai.com"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.7_0.18_185)] transition hover:text-[oklch(0.75_0.16_185)]"
          >
            Talk to Sales
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[oklch(0.7_0.18_185/0.1)] via-[oklch(0.13_0.02_200)] to-[oklch(0.5_0.12_260/0.1)] p-12 text-center md:p-20">
          {/* Glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[oklch(0.5_0.15_185/0.15)] blur-[100px]" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Stop guessing. Start protecting.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
              Connect your AI systems in minutes, get your first security scan
              today, and know exactly where you stand. 14-day free trial, no
              credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:hello@archon-ai.com"
                className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.7_0.18_185)] px-8 py-4 text-base font-semibold text-[oklch(0.1_0.02_200)] transition hover:bg-[oklch(0.75_0.16_185)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Your Free Trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@archon-ai.com"
                className="inline-flex items-center gap-2 text-base text-white/50 transition hover:text-white"
              >
                Or email hello@archon-ai.com
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[oklch(0.7_0.18_185)]" />
          <span className="font-semibold text-white">Archon AI</span>
        </div>
        <div className="flex gap-8 text-sm text-white/30">
          <a href="#features" className="transition hover:text-white/60">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-white/60">
            How It Works
          </a>
          <a href="#pricing" className="transition hover:text-white/60">
            Pricing
          </a>
          <a
            href="mailto:hello@archon-ai.com"
            className="transition hover:text-white/60"
          >
            Contact
          </a>
        </div>
        <div className="text-sm text-white/20">
          &copy; 2026 Archon AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.1_0.02_200)] text-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <SocialProof />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
