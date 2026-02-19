"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/shared/progress-ring";
import { SeverityBadge, StatusBadge } from "@/components/platform/severity-badge";
import {
  overviewStats,
  alerts,
  systems,
  complianceFrameworks,
  vulnerabilities,
  scanHistory,
  categoryBreakdown,
  activityFeed,
} from "@/data/demo-data";
import { cn } from "@/lib/utils";
import {
  Server,
  AlertTriangle,
  ShieldCheck,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  FileWarning,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Radio,
  FileText,
  Link2,
  BarChart3,
} from "lucide-react";

const activityIcons: Record<string, typeof Zap> = {
  scan_complete: Search,
  alert_triggered: Zap,
  system_connected: Link2,
  vulnerability_resolved: CheckCircle2,
  compliance_updated: ShieldCheck,
  report_generated: FileText,
};

const statusDot: Record<string, string> = {
  healthy: "bg-emerald-500/80",
  warning: "bg-amber-500/80",
  critical: "bg-red-500/80",
};

export default function DemoOverview() {
  const scanTrend = Math.round(
    ((overviewStats.scansThisMonth - overviewStats.scansLastMonth) /
      overviewStats.scansLastMonth) *
      100
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Security Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time security posture across {overviewStats.systemsConnected}{" "}
            connected AI systems
          </p>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <Radio className="size-3 text-emerald-500/80 animate-pulse" />
          Last updated {overviewStats.lastScanTime}
        </div>
      </div>

      {/* Row 1: Risk Score + Stats */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Risk Score */}
        <Card className="lg:col-span-3">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Security Score
            </p>
            <ProgressRing
              percentage={overviewStats.riskScore}
              size={130}
              strokeWidth={9}
            />
            <p className="mt-3 text-xs text-amber-400/80">Needs Attention</p>
          </CardContent>
        </Card>

        {/* Stat Grid */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-9 lg:grid-cols-4">
          {[
            {
              label: "Systems Connected",
              value: overviewStats.systemsConnected,
              icon: Server,
              sub: `${overviewStats.systemsHealthy} healthy, ${overviewStats.systemsWarning} warning, ${overviewStats.systemsCritical} critical`,
            },
            {
              label: "Active Alerts",
              value: overviewStats.activeAlerts,
              icon: AlertTriangle,
              sub: `${alerts.filter((a) => a.severity === "critical").length} critical requiring action`,
              warn: true,
            },
            {
              label: "Scans This Month",
              value: overviewStats.scansThisMonth,
              icon: Search,
              sub: `${scanTrend > 0 ? "+" : ""}${scanTrend}% vs last month`,
              trend: scanTrend,
            },
            {
              label: "Open Vulnerabilities",
              value: overviewStats.vulnerabilitiesOpen,
              icon: FileWarning,
              sub: `${overviewStats.vulnerabilitiesResolved} resolved, ${overviewStats.meanTimeToResolve} avg`,
            },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className="size-4 text-muted-foreground/60" />
                  {stat.trend !== undefined && (
                    <span
                      className={cn(
                        "flex items-center text-[10px] font-medium",
                        stat.trend > 0
                          ? "text-emerald-400/70"
                          : "text-red-400/70"
                      )}
                    >
                      {stat.trend > 0 ? (
                        <ArrowUpRight className="mr-0.5 size-3" />
                      ) : (
                        <ArrowDownRight className="mr-0.5 size-3" />
                      )}
                      {Math.abs(stat.trend)}%
                    </span>
                  )}
                </div>
                <p className="mt-3 text-2xl font-semibold tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {stat.label}
                </p>
                <p
                  className={cn(
                    "mt-2 text-[10px]",
                    stat.warn
                      ? "text-red-400/60"
                      : "text-muted-foreground/60"
                  )}
                >
                  {stat.sub}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Row 2: Scan Activity Chart + Vulnerability Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Scan Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Scan Activity (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex items-end gap-2" style={{ height: 120 }}>
              {scanHistory.map((d) => {
                const maxScans = Math.max(...scanHistory.map((s) => s.scans));
                const h = (d.scans / maxScans) * 100;
                return (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] tabular-nums text-muted-foreground/60">
                      {d.scans}
                    </span>
                    <div className="relative w-full flex flex-col justify-end" style={{ height: 80 }}>
                      <div
                        className="w-full rounded-sm bg-primary/15"
                        style={{ height: `${h}%` }}
                      />
                      <div
                        className="absolute bottom-0 w-full rounded-sm bg-red-400/20"
                        style={{ height: `${(d.findings / maxScans) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground/50">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground/50">
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-2 rounded-sm bg-primary/15" />
                Scans
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-2 rounded-sm bg-red-400/20" />
                Findings
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Vulnerability Breakdown by Category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Vulnerabilities by Category
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

      {/* Row 3: Compliance + Recent Alerts */}
      <div className="grid gap-4 md:grid-cols-5">
        {/* Compliance Summary */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            {complianceFrameworks.map((fw) => {
              const compliant = fw.requirements.filter(
                (r) => r.status === "compliant"
              ).length;
              const total = fw.requirements.length;
              return (
                <div key={fw.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{fw.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground/60">
                        {compliant}/{total} requirements
                      </span>
                      <span
                        className={cn(
                          "text-xs font-semibold tabular-nums",
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
                  </div>
                  <Progress value={fw.overallScore} className="h-1" />
                </div>
              );
            })}
            <div className="pt-1 text-[10px] text-muted-foreground/50">
              Next audit scheduled: 3 March 2026
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {alerts.slice(0, 6).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 px-6 py-2.5"
                >
                  <SeverityBadge
                    severity={alert.severity}
                    className="mt-0.5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs">{alert.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground/50">
                      {alert.systemName}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/40">
                    {alert.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Systems Health + Activity Feed */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Systems Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Systems Health
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {[...systems]
                .sort((a, b) => a.healthScore - b.healthScore)
                .map((sys) => (
                  <div
                    key={sys.id}
                    className="flex items-center gap-3 px-6 py-2.5"
                  >
                    <div
                      className={cn(
                        "size-1.5 shrink-0 rounded-full",
                        statusDot[sys.status]
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate text-xs">
                      {sys.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50">
                      {sys.type}
                    </span>
                    <div className="w-20">
                      <Progress value={sys.healthScore} className="h-1" />
                    </div>
                    <span className="w-8 text-right text-[10px] tabular-nums text-muted-foreground/60">
                      {sys.healthScore}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {activityFeed.slice(0, 10).map((item) => {
                const Icon = activityIcons[item.type] || Activity;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 px-6 py-2.5"
                  >
                    <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/40" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs">{item.title}</p>
                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground/50">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/40">
                      {item.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
