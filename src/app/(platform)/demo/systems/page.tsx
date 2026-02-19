"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/platform/severity-badge";
import {
  systems,
  alerts,
  vulnerabilities,
  type SystemStatus,
} from "@/data/demo-data";
import { cn } from "@/lib/utils";
import {
  Server,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Activity,
  Clock,
  ArrowUpDown,
  User,
  Cpu,
  Zap,
} from "lucide-react";

const statusDot: Record<SystemStatus, string> = {
  healthy: "bg-emerald-500/80",
  warning: "bg-amber-500/80",
  critical: "bg-red-500/80",
};

const typeBadge: Record<string, string> = {
  LLM: "bg-violet-500/8 text-violet-400/80 border-violet-500/10",
  Chatbot: "bg-blue-500/8 text-blue-400/80 border-blue-500/10",
  "ML Pipeline": "bg-primary/8 text-primary/80 border-primary/10",
  "Computer Vision": "bg-pink-500/8 text-pink-400/80 border-pink-500/10",
  "NLP Engine": "bg-emerald-500/8 text-emerald-400/80 border-emerald-500/10",
  Recommendation: "bg-amber-500/8 text-amber-400/80 border-amber-500/10",
};

const riskBadge: Record<string, string> = {
  high: "bg-red-500/8 text-red-400/80 border-red-500/10",
  limited: "bg-amber-500/8 text-amber-400/80 border-amber-500/10",
  minimal: "bg-emerald-500/8 text-emerald-400/80 border-emerald-500/10",
};

type Filter = "all" | SystemStatus;

const filters: { value: Filter; label: string; count: number }[] = [
  { value: "all", label: "All Systems", count: systems.length },
  { value: "healthy", label: "Healthy", count: systems.filter((s) => s.status === "healthy").length },
  { value: "warning", label: "Warning", count: systems.filter((s) => s.status === "warning").length },
  { value: "critical", label: "Critical", count: systems.filter((s) => s.status === "critical").length },
];

type SortKey = "name" | "healthScore" | "riskAreas" | "status";

function getAlertCount(systemName: string) {
  return alerts.filter((a) => a.systemName === systemName).length;
}
function getVulnCount(systemName: string) {
  return vulnerabilities.filter((v) => v.systemName === systemName && v.status !== "resolved").length;
}

export default function SystemsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("healthScore");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered =
    filter === "all"
      ? systems
      : systems.filter((s) => s.status === filter);

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    if (sortBy === "healthScore") return (a.healthScore - b.healthScore) * dir;
    if (sortBy === "riskAreas") return (a.riskAreas - b.riskAreas) * dir;
    const statusOrder: Record<SystemStatus, number> = { critical: 0, warning: 1, healthy: 2 };
    return (statusOrder[a.status] - statusOrder[b.status]) * dir;
  });

  const avgHealth = Math.round(systems.reduce((s, sys) => s + sys.healthScore, 0) / systems.length);
  const totalAlerts = alerts.length;
  const totalVulns = vulnerabilities.filter((v) => v.status !== "resolved").length;

  function toggleSort(key: SortKey) {
    if (sortBy === key) setSortAsc(!sortAsc);
    else { setSortBy(key); setSortAsc(false); }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Systems</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {systems.length} connected systems across your organisation
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Systems", value: systems.length, icon: Server, sub: `${filters[1].count} healthy` },
          { label: "Avg Health Score", value: `${avgHealth}%`, icon: Activity, sub: "Across all systems" },
          { label: "Active Alerts", value: totalAlerts, icon: AlertTriangle, sub: `${alerts.filter((a) => a.severity === "critical").length} critical`, warn: true },
          { label: "Open Vulnerabilities", value: totalVulns, icon: ShieldAlert, sub: `${vulnerabilities.filter((v) => v.status === "resolved").length} resolved` },
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

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/60 hover:bg-muted/30 hover:text-muted-foreground"
              )}
            >
              {f.label}
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                filter === f.value ? "bg-primary/15" : "bg-muted/30"
              )}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="hidden border-b border-border/50 px-6 py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50 md:grid md:grid-cols-12 md:gap-4">
            <button onClick={() => toggleSort("status")} className="col-span-1 flex items-center gap-1 hover:text-muted-foreground">
              Status <ArrowUpDown className="size-2.5" />
            </button>
            <button onClick={() => toggleSort("name")} className="col-span-3 flex items-center gap-1 text-left hover:text-muted-foreground">
              System <ArrowUpDown className="size-2.5" />
            </button>
            <div className="col-span-1">Type</div>
            <div className="col-span-1">Risk Level</div>
            <button onClick={() => toggleSort("healthScore")} className="col-span-2 flex items-center gap-1 hover:text-muted-foreground">
              Health <ArrowUpDown className="size-2.5" />
            </button>
            <button onClick={() => toggleSort("riskAreas")} className="col-span-1 flex items-center gap-1 hover:text-muted-foreground">
              Issues <ArrowUpDown className="size-2.5" />
            </button>
            <div className="col-span-1">Uptime</div>
            <div className="col-span-2">Owner</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/50">
            {sorted.map((sys) => {
              const sysAlerts = getAlertCount(sys.name);
              const sysVulns = getVulnCount(sys.name);
              return (
                <div
                  key={sys.id}
                  className="group grid items-center gap-4 px-6 py-3 transition-colors hover:bg-muted/5 md:grid-cols-12"
                >
                  {/* Status */}
                  <div className="col-span-1 flex items-center md:justify-center">
                    <div className={cn("size-2 shrink-0 rounded-full", statusDot[sys.status])} />
                  </div>

                  {/* System */}
                  <div className="col-span-3 min-w-0">
                    <p className="truncate text-sm font-medium">{sys.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground/50">
                      {sys.department} &middot; {sys.apiCalls}
                    </p>
                  </div>

                  {/* Type */}
                  <div className="col-span-1">
                    <Badge variant="outline" className={cn("text-[9px] font-medium uppercase tracking-wider", typeBadge[sys.type])}>
                      {sys.type}
                    </Badge>
                  </div>

                  {/* Risk Level */}
                  <div className="col-span-1">
                    <Badge variant="outline" className={cn("text-[9px] font-medium uppercase tracking-wider", riskBadge[sys.riskLevel])}>
                      {sys.riskLevel}
                    </Badge>
                  </div>

                  {/* Health Score */}
                  <div className="col-span-2 flex items-center gap-2">
                    <Progress value={sys.healthScore} className="h-1 flex-1" />
                    <span className={cn(
                      "w-8 text-right text-xs tabular-nums font-medium",
                      sys.healthScore >= 85 ? "text-emerald-400/70" :
                      sys.healthScore >= 65 ? "text-amber-400/70" :
                      "text-red-400/70"
                    )}>
                      {sys.healthScore}
                    </span>
                  </div>

                  {/* Issues */}
                  <div className="col-span-1 flex items-center gap-2">
                    {sysAlerts > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] text-amber-400/60">
                        <AlertTriangle className="size-2.5" />
                        {sysAlerts}
                      </span>
                    )}
                    {sysVulns > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] text-red-400/60">
                        <ShieldAlert className="size-2.5" />
                        {sysVulns}
                      </span>
                    )}
                    {sysAlerts === 0 && sysVulns === 0 && (
                      <ShieldCheck className="size-3 text-emerald-400/40" />
                    )}
                  </div>

                  {/* Uptime */}
                  <div className="col-span-1">
                    <span className="text-xs tabular-nums text-muted-foreground/60">
                      {sys.uptime}%
                    </span>
                  </div>

                  {/* Owner + Last Scan */}
                  <div className="col-span-2 min-w-0">
                    <p className="truncate text-xs text-muted-foreground/70">{sys.owner}</p>
                    <p className="flex items-center gap-1 text-[10px] text-muted-foreground/40">
                      <Clock className="size-2.5" />
                      {sys.lastScan}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Systems by Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 pb-4">
            {Object.entries(
              systems.reduce<Record<string, number>>((acc, sys) => {
                acc[sys.type] = (acc[sys.type] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-xs text-muted-foreground">{type}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-muted/30">
                    <div
                      className="h-full rounded-full bg-primary/25"
                      style={{ width: `${(count / systems.length) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right text-[10px] tabular-nums text-muted-foreground/60">
                    {count}
                  </span>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Systems by Department
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 pb-4">
            {Object.entries(
              systems.reduce<Record<string, number>>((acc, sys) => {
                acc[sys.department] = (acc[sys.department] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([dept, count]) => (
                <div key={dept} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-xs text-muted-foreground">{dept}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-muted/30">
                    <div
                      className="h-full rounded-full bg-primary/25"
                      style={{ width: `${(count / systems.length) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right text-[10px] tabular-nums text-muted-foreground/60">
                    {count}
                  </span>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
