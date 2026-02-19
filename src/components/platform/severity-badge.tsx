"use client";

import { Badge } from "@/components/ui/badge";
import type { Severity } from "@/data/demo-data";
import { cn } from "@/lib/utils";

const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: { label: "Critical", className: "bg-red-500/8 text-red-400/90 border-red-500/10" },
  high: { label: "High", className: "bg-orange-500/8 text-orange-400/90 border-orange-500/10" },
  medium: { label: "Medium", className: "bg-amber-500/8 text-amber-400/80 border-amber-500/10" },
  low: { label: "Low", className: "bg-slate-400/8 text-slate-400/80 border-slate-400/10" },
};

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const config = severityConfig[severity];
  return (
    <Badge variant="outline" className={cn("text-[10px] font-medium uppercase tracking-wider", config.className, className)}>
      {config.label}
    </Badge>
  );
}

// Status badges
const statusConfig: Record<string, { label: string; className: string }> = {
  healthy: { label: "Healthy", className: "bg-emerald-500/8 text-emerald-400/80 border-emerald-500/10" },
  warning: { label: "Warning", className: "bg-amber-500/8 text-amber-400/80 border-amber-500/10" },
  critical: { label: "Critical", className: "bg-red-500/8 text-red-400/80 border-red-500/10" },
  open: { label: "Open", className: "bg-red-500/8 text-red-400/80 border-red-500/10" },
  "in-review": { label: "In Review", className: "bg-amber-500/8 text-amber-400/80 border-amber-500/10" },
  resolved: { label: "Resolved", className: "bg-emerald-500/8 text-emerald-400/80 border-emerald-500/10" },
  compliant: { label: "Compliant", className: "bg-emerald-500/8 text-emerald-400/80 border-emerald-500/10" },
  "in-progress": { label: "In Progress", className: "bg-amber-500/8 text-amber-400/80 border-amber-500/10" },
  "non-compliant": { label: "Non-Compliant", className: "bg-red-500/8 text-red-400/80 border-red-500/10" },
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const config = statusConfig[status] || { label: status, className: "bg-slate-500/8 text-slate-400/80 border-slate-500/10" };
  return (
    <Badge variant="outline" className={cn("text-[10px] font-medium uppercase tracking-wider", config.className, className)}>
      {config.label}
    </Badge>
  );
}
