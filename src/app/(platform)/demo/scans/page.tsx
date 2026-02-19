"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SeverityBadge, StatusBadge } from "@/components/platform/severity-badge";
import {
  vulnerabilities,
  categoryBreakdown,
  getVulnerabilityCounts,
  type Severity,
} from "@/data/demo-data";
import { cn } from "@/lib/utils";
import {
  ShieldAlert,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ArrowUpDown,
  TrendingDown,
  CheckCircle2,
  Timer,
  Filter,
} from "lucide-react";

type SevFilter = "all" | Severity;
type StatusFilter = "all" | "open" | "in-review" | "resolved";
type SortKey = "severity" | "cvss" | "date" | "system";

const sevFilters: { value: SevFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "in-review", label: "In Review" },
  { value: "resolved", label: "Resolved" },
];

const sevOrder: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };

const cvssColor = (score: number) => {
  if (score >= 9.0) return "text-red-400/80";
  if (score >= 7.0) return "text-orange-400/80";
  if (score >= 4.0) return "text-amber-400/80";
  return "text-slate-400/70";
};

export default function ScansPage() {
  const [sevFilter, setSevFilter] = useState<SevFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("cvss");
  const [sortAsc, setSortAsc] = useState(false);

  const counts = getVulnerabilityCounts();
  const openCount = vulnerabilities.filter((v) => v.status === "open").length;
  const reviewCount = vulnerabilities.filter((v) => v.status === "in-review").length;
  const resolvedCount = vulnerabilities.filter((v) => v.status === "resolved").length;
  const avgCvss = (vulnerabilities.reduce((s, v) => s + v.cvss, 0) / vulnerabilities.length).toFixed(1);

  const filtered = vulnerabilities
    .filter((v) => sevFilter === "all" || v.severity === sevFilter)
    .filter((v) => statusFilter === "all" || v.status === statusFilter);

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortBy === "severity") return (sevOrder[a.severity] - sevOrder[b.severity]) * dir;
    if (sortBy === "cvss") return (b.cvss - a.cvss) * dir * -1;
    if (sortBy === "system") return a.systemName.localeCompare(b.systemName) * dir;
    return 0;
  });

  function toggleSort(key: SortKey) {
    if (sortBy === key) setSortAsc(!sortAsc);
    else { setSortBy(key); setSortAsc(false); }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Scan Results</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Latest vulnerability findings across all connected systems
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {[
          { label: "Total Findings", value: vulnerabilities.length, icon: ShieldAlert, sub: `${openCount} require action` },
          { label: "Critical / High", value: `${counts.critical} / ${counts.high}`, icon: AlertTriangle, sub: "Immediate attention", warn: true },
          { label: "In Review", value: reviewCount, icon: Clock, sub: `${resolvedCount} resolved this month` },
          { label: "Avg CVSS Score", value: avgCvss, icon: TrendingDown, sub: "Across all findings" },
          { label: "Resolution Rate", value: `${Math.round((resolvedCount / vulnerabilities.length) * 100)}%`, icon: CheckCircle2, sub: "4.2 days avg time" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <stat.icon className="size-4 text-muted-foreground/60" />
              <p className="mt-3 text-2xl font-semibold tabular-nums">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
              <p className={cn("mt-2 text-[10px]", stat.warn ? "text-red-400/60" : "text-muted-foreground/60")}>
                {stat.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Severity Distribution + Category Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Severity Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Severity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {[
                { key: "critical", count: counts.critical, color: "bg-red-500/60" },
                { key: "high", count: counts.high, color: "bg-orange-500/50" },
                { key: "medium", count: counts.medium, color: "bg-amber-500/40" },
                { key: "low", count: counts.low, color: "bg-slate-500/30" },
              ].map((s) => (
                <div
                  key={s.key}
                  className={cn("h-full transition-all", s.color)}
                  style={{ width: `${(s.count / vulnerabilities.length) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground/50">
              {[
                { label: "Critical", count: counts.critical, color: "bg-red-500/60" },
                { label: "High", count: counts.high, color: "bg-orange-500/50" },
                { label: "Medium", count: counts.medium, color: "bg-amber-500/40" },
                { label: "Low", count: counts.low, color: "bg-slate-500/30" },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-1.5">
                  <span className={cn("inline-block size-2 rounded-sm", s.color)} />
                  {s.label} ({s.count})
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Findings by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 pb-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-xs text-muted-foreground">
                  {cat.category}
                </span>
                <div className="h-1.5 flex-1 rounded-full bg-muted/30">
                  <div
                    className="h-full rounded-full bg-primary/25"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right text-[10px] tabular-nums text-muted-foreground/60">
                  {cat.count}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-1.5">
          {sevFilters.map((f) => {
            const count = f.value === "all" ? vulnerabilities.length : counts[f.value];
            return (
              <button
                key={f.value}
                onClick={() => setSevFilter(f.value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  sevFilter === f.value
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground/60 hover:bg-muted/30 hover:text-muted-foreground"
                )}
              >
                {f.label}
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                  sevFilter === f.value ? "bg-primary/15" : "bg-muted/30"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="h-4 w-px bg-border/50" />
        <div className="flex gap-1.5">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === f.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/60 hover:bg-muted/30 hover:text-muted-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Findings Table */}
      <Card>
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="hidden border-b border-border/50 px-6 py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50 md:grid md:grid-cols-12 md:gap-4">
            <button onClick={() => toggleSort("severity")} className="col-span-1 flex items-center gap-1 hover:text-muted-foreground">
              Sev <ArrowUpDown className="size-2.5" />
            </button>
            <button onClick={() => toggleSort("cvss")} className="col-span-1 flex items-center gap-1 hover:text-muted-foreground">
              CVSS <ArrowUpDown className="size-2.5" />
            </button>
            <div className="col-span-4">Finding</div>
            <button onClick={() => toggleSort("system")} className="col-span-2 flex items-center gap-1 hover:text-muted-foreground">
              System <ArrowUpDown className="size-2.5" />
            </button>
            <div className="col-span-1">Category</div>
            <div className="col-span-1">Detected</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/50">
            {sorted.map((vuln) => (
              <div
                key={vuln.id}
                className="group grid items-center gap-4 px-6 py-3 transition-colors hover:bg-muted/5 md:grid-cols-12"
              >
                {/* Severity */}
                <div className="col-span-1">
                  <SeverityBadge severity={vuln.severity} />
                </div>

                {/* CVSS */}
                <div className="col-span-1">
                  <span className={cn("text-sm font-semibold tabular-nums", cvssColor(vuln.cvss))}>
                    {vuln.cvss.toFixed(1)}
                  </span>
                </div>

                {/* Finding */}
                <div className="col-span-4 min-w-0">
                  <p className="truncate text-xs font-medium">{vuln.finding}</p>
                </div>

                {/* System */}
                <div className="col-span-2 min-w-0">
                  <p className="truncate text-xs text-muted-foreground/70">{vuln.systemName}</p>
                </div>

                {/* Category */}
                <div className="col-span-1">
                  <span className="text-[10px] text-primary/60">{vuln.category}</span>
                </div>

                {/* Detected */}
                <div className="col-span-1">
                  <span className="text-[10px] tabular-nums text-muted-foreground/40">{vuln.detectedAt}</span>
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-end">
                  <StatusBadge status={vuln.status} />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border/50 px-6 py-2.5 text-[10px] text-muted-foreground/40">
            Showing {sorted.length} of {vulnerabilities.length} findings
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
