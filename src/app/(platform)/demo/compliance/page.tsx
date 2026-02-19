"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/shared/progress-ring";
import { StatusBadge } from "@/components/platform/severity-badge";
import {
  complianceFrameworks,
  type ComplianceStatus,
  type ComplianceFramework,
} from "@/data/demo-data";
import { cn } from "@/lib/utils";
import {
  Check,
  Clock,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Calendar,
  Building2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const statusConfig: Record<ComplianceStatus, { icon: typeof Check; className: string; dotColor: string }> = {
  compliant: { icon: CheckCircle2, className: "text-emerald-400/70", dotColor: "bg-emerald-500/80" },
  "in-progress": { icon: Clock, className: "text-amber-400/70", dotColor: "bg-amber-500/80" },
  "non-compliant": { icon: XCircle, className: "text-red-400/70", dotColor: "bg-red-500/80" },
};

function getStatusCounts(fw: ComplianceFramework) {
  return {
    compliant: fw.requirements.filter((r) => r.status === "compliant").length,
    inProgress: fw.requirements.filter((r) => r.status === "in-progress").length,
    nonCompliant: fw.requirements.filter((r) => r.status === "non-compliant").length,
  };
}

export default function CompliancePage() {
  const [selectedFramework, setSelectedFramework] = useState(complianceFrameworks[0].id);
  const activeFramework = complianceFrameworks.find((f) => f.id === selectedFramework)!;
  const activeCounts = getStatusCounts(activeFramework);

  const overallScore = Math.round(
    complianceFrameworks.reduce((s, f) => s + f.overallScore, 0) / complianceFrameworks.length
  );

  const totalReqs = complianceFrameworks.reduce((s, f) => s + f.requirements.length, 0);
  const totalCompliant = complianceFrameworks.reduce(
    (s, f) => s + f.requirements.filter((r) => r.status === "compliant").length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Compliance</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track compliance progress across {complianceFrameworks.length} regulatory frameworks
          </p>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Overall Score */}
        <Card className="lg:col-span-3">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Overall Compliance
            </p>
            <ProgressRing
              percentage={overallScore}
              size={130}
              strokeWidth={9}
            />
            <p className="mt-3 text-xs text-emerald-400/60">
              {totalCompliant}/{totalReqs} requirements met
            </p>
          </CardContent>
        </Card>

        {/* Framework Quick Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-9">
          {complianceFrameworks.map((fw) => {
            const counts = getStatusCounts(fw);
            const isActive = fw.id === selectedFramework;
            return (
              <Card
                key={fw.id}
                className={cn(
                  "cursor-pointer transition-all",
                  isActive
                    ? "border-primary/30 bg-primary/5"
                    : "hover:border-primary/15"
                )}
                onClick={() => setSelectedFramework(fw.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{fw.name}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground/50">
                        {fw.requirements.length} requirements
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-lg font-semibold tabular-nums",
                        fw.overallScore >= 85
                          ? "text-emerald-400/70"
                          : fw.overallScore >= 65
                          ? "text-amber-400/70"
                          : "text-red-400/70"
                      )}
                    >
                      {fw.overallScore}%
                    </span>
                  </div>

                  <Progress value={fw.overallScore} className="mt-3 h-1" />

                  <div className="mt-3 flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1 text-emerald-400/60">
                      <span className="size-1.5 rounded-full bg-emerald-500/80" />
                      {counts.compliant}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400/60">
                      <span className="size-1.5 rounded-full bg-amber-500/80" />
                      {counts.inProgress}
                    </span>
                    <span className="flex items-center gap-1 text-red-400/60">
                      <span className="size-1.5 rounded-full bg-red-500/80" />
                      {counts.nonCompliant}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground/40">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-2.5" />
                      Audit: {fw.lastAudit}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Active Framework Detail */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Requirements */}
        <Card className="lg:col-span-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {activeFramework.name} Requirements
              </CardTitle>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground/40">
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500/80" /> Compliant ({activeCounts.compliant})
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-amber-500/80" /> In Progress ({activeCounts.inProgress})
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-red-500/80" /> Non-Compliant ({activeCounts.nonCompliant})
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {activeFramework.requirements.map((req) => {
                const config = statusConfig[req.status];
                const Icon = config.icon;
                return (
                  <div key={req.id} className="group px-6 py-3 transition-colors hover:bg-muted/5">
                    <div className="flex items-start gap-3">
                      <Icon className={cn("mt-0.5 size-4 shrink-0", config.className)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-sm font-medium">{req.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-xs font-semibold tabular-nums",
                              req.progress >= 90 ? "text-emerald-400/70" :
                              req.progress >= 50 ? "text-amber-400/70" :
                              "text-red-400/70"
                            )}>
                              {req.progress}%
                            </span>
                            <StatusBadge status={req.status} />
                          </div>
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground/50">{req.description}</p>
                        <Progress value={req.progress} className="mt-2 h-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-4 lg:col-span-4">
          {/* Audit Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Audit Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
              {[
                { label: "Framework", value: activeFramework.name, icon: ShieldCheck },
                { label: "Last Audit", value: activeFramework.lastAudit, icon: Calendar },
                { label: "Next Audit", value: activeFramework.nextAudit, icon: Clock },
                { label: "Auditor", value: activeFramework.auditor, icon: Building2 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="size-3.5 shrink-0 text-muted-foreground/40" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-muted-foreground/50">{item.label}</p>
                    <p className="text-xs">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Score Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              {/* Stacked completion bar */}
              <div className="flex h-2 w-full overflow-hidden rounded-full">
                <div
                  className="h-full bg-emerald-500/50"
                  style={{ width: `${(activeCounts.compliant / activeFramework.requirements.length) * 100}%` }}
                />
                <div
                  className="h-full bg-amber-500/40"
                  style={{ width: `${(activeCounts.inProgress / activeFramework.requirements.length) * 100}%` }}
                />
                <div
                  className="h-full bg-red-500/40"
                  style={{ width: `${(activeCounts.nonCompliant / activeFramework.requirements.length) * 100}%` }}
                />
              </div>

              <div className="mt-4 space-y-2.5">
                {activeFramework.requirements
                  .sort((a, b) => b.progress - a.progress)
                  .map((req) => (
                    <div key={req.id} className="flex items-center gap-2">
                      <div className={cn("size-1.5 shrink-0 rounded-full", statusConfig[req.status].dotColor)} />
                      <span className="min-w-0 flex-1 truncate text-[10px] text-muted-foreground/60">
                        {req.name}
                      </span>
                      <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/40">
                        {req.progress}%
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Priority Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pb-4">
              {activeFramework.requirements
                .filter((r) => r.status !== "compliant")
                .sort((a, b) => a.progress - b.progress)
                .slice(0, 4)
                .map((req, i) => (
                  <div key={req.id} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary/70">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium">{req.name}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground/50">
                        Currently at {req.progress}% — {req.status === "non-compliant" ? "requires immediate action" : "in progress"}
                      </p>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Frameworks Comparison */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Framework Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden border-b border-border/50 px-6 py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50 md:grid md:grid-cols-12 md:gap-4">
            <div className="col-span-2">Framework</div>
            <div className="col-span-3">Progress</div>
            <div className="col-span-1">Score</div>
            <div className="col-span-1">Compliant</div>
            <div className="col-span-1">In Progress</div>
            <div className="col-span-1">Gaps</div>
            <div className="col-span-1">Last Audit</div>
            <div className="col-span-2">Auditor</div>
          </div>
          <div className="divide-y divide-border/50">
            {complianceFrameworks.map((fw) => {
              const counts = getStatusCounts(fw);
              return (
                <div
                  key={fw.id}
                  className="grid items-center gap-4 px-6 py-3 transition-colors hover:bg-muted/5 md:grid-cols-12"
                >
                  <div className="col-span-2">
                    <p className="text-sm font-medium">{fw.name}</p>
                    <p className="text-[10px] text-muted-foreground/40">{fw.requirements.length} requirements</p>
                  </div>
                  <div className="col-span-3">
                    <Progress value={fw.overallScore} className="h-1.5" />
                  </div>
                  <div className="col-span-1">
                    <span className={cn(
                      "text-sm font-semibold tabular-nums",
                      fw.overallScore >= 85 ? "text-emerald-400/70" :
                      fw.overallScore >= 65 ? "text-amber-400/70" :
                      "text-red-400/70"
                    )}>
                      {fw.overallScore}%
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-xs tabular-nums text-emerald-400/60">{counts.compliant}</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-xs tabular-nums text-amber-400/60">{counts.inProgress}</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-xs tabular-nums text-red-400/60">{counts.nonCompliant}</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-[10px] tabular-nums text-muted-foreground/40">{fw.lastAudit}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground/50">{fw.auditor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
