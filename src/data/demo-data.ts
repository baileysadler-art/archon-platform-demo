// ── Types ──

export type SystemStatus = "healthy" | "warning" | "critical";
export type Severity = "critical" | "high" | "medium" | "low";
export type ComplianceStatus = "compliant" | "in-progress" | "non-compliant";

export interface AISystem {
  id: string;
  name: string;
  type: "LLM" | "Chatbot" | "ML Pipeline" | "Computer Vision" | "NLP Engine" | "Recommendation";
  status: SystemStatus;
  healthScore: number;
  lastScan: string;
  riskAreas: number;
  department: string;
  description: string;
  uptime: number;
  owner: string;
  apiCalls: string;
  riskLevel: "high" | "limited" | "minimal";
}

export interface Alert {
  id: string;
  severity: Severity;
  title: string;
  systemName: string;
  timestamp: string;
  category: string;
}

export interface Vulnerability {
  id: string;
  severity: Severity;
  category: string;
  finding: string;
  systemName: string;
  detectedAt: string;
  status: "open" | "in-review" | "resolved";
  cvss: number;
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  status: ComplianceStatus;
  progress: number;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  overallScore: number;
  requirements: ComplianceRequirement[];
  lastAudit: string;
  nextAudit: string;
  auditor: string;
}

// ── Mock Data ──

export const systems: AISystem[] = [
  { id: "sys-1", name: "Customer Service Chatbot", type: "Chatbot", status: "healthy", healthScore: 92, lastScan: "2 min ago", riskAreas: 1, department: "Customer Support", description: "Public-facing chat assistant handling 15K queries per day", uptime: 99.97, owner: "Sarah Chen", apiCalls: "15.2K/day", riskLevel: "limited" },
  { id: "sys-2", name: "Claims Processing LLM", type: "LLM", status: "warning", healthScore: 68, lastScan: "14 min ago", riskAreas: 4, department: "Insurance", description: "Processes and triages insurance claims automatically", uptime: 99.82, owner: "James Wright", apiCalls: "8.7K/day", riskLevel: "high" },
  { id: "sys-3", name: "Fraud Detection Model", type: "ML Pipeline", status: "healthy", healthScore: 88, lastScan: "7 min ago", riskAreas: 2, department: "Finance", description: "Real-time transaction fraud scoring for payments", uptime: 99.99, owner: "Priya Sharma", apiCalls: "42.1K/day", riskLevel: "high" },
  { id: "sys-4", name: "HR Screening Pipeline", type: "ML Pipeline", status: "critical", healthScore: 41, lastScan: "3 min ago", riskAreas: 7, department: "Human Resources", description: "CV screening and candidate ranking for recruitment", uptime: 98.91, owner: "Tom Bradley", apiCalls: "1.2K/day", riskLevel: "high" },
  { id: "sys-5", name: "Document Analysis Engine", type: "NLP Engine", status: "healthy", healthScore: 85, lastScan: "22 min ago", riskAreas: 2, department: "Legal", description: "Contract review and clause extraction for legal team", uptime: 99.94, owner: "Emma Liu", apiCalls: "3.8K/day", riskLevel: "high" },
  { id: "sys-6", name: "Product Recommendation AI", type: "Recommendation", status: "healthy", healthScore: 91, lastScan: "5 min ago", riskAreas: 1, department: "E-Commerce", description: "Personalised product recommendations for online store", uptime: 99.96, owner: "Alex Kumar", apiCalls: "28.4K/day", riskLevel: "limited" },
  { id: "sys-7", name: "Medical Imaging Classifier", type: "Computer Vision", status: "warning", healthScore: 63, lastScan: "11 min ago", riskAreas: 5, department: "Healthcare", description: "X-ray and scan analysis for preliminary diagnosis", uptime: 99.88, owner: "Dr. Fatima Hassan", apiCalls: "2.1K/day", riskLevel: "high" },
  { id: "sys-8", name: "Internal Knowledge Assistant", type: "Chatbot", status: "healthy", healthScore: 94, lastScan: "1 min ago", riskAreas: 0, department: "Operations", description: "Employee-facing assistant for internal policy queries", uptime: 99.99, owner: "David Park", apiCalls: "6.3K/day", riskLevel: "minimal" },
  { id: "sys-9", name: "Sentiment Analysis API", type: "NLP Engine", status: "healthy", healthScore: 87, lastScan: "9 min ago", riskAreas: 1, department: "Marketing", description: "Brand sentiment tracking across social channels", uptime: 99.95, owner: "Rachel Torres", apiCalls: "11.6K/day", riskLevel: "limited" },
  { id: "sys-10", name: "Credit Risk Scorer", type: "ML Pipeline", status: "warning", healthScore: 72, lastScan: "6 min ago", riskAreas: 3, department: "Finance", description: "Automated credit scoring for loan applications", uptime: 99.76, owner: "Michael O'Brien", apiCalls: "5.9K/day", riskLevel: "high" },
  { id: "sys-11", name: "Supply Chain Forecaster", type: "ML Pipeline", status: "healthy", healthScore: 89, lastScan: "18 min ago", riskAreas: 1, department: "Logistics", description: "Demand forecasting and inventory optimisation", uptime: 99.98, owner: "Yuki Tanaka", apiCalls: "4.2K/day", riskLevel: "limited" },
  { id: "sys-12", name: "Content Moderation AI", type: "Computer Vision", status: "healthy", healthScore: 83, lastScan: "4 min ago", riskAreas: 2, department: "Trust & Safety", description: "Image and text moderation for user-generated content", uptime: 99.93, owner: "Chris Nguyen", apiCalls: "19.7K/day", riskLevel: "limited" },
];

export const alerts: Alert[] = [
  { id: "a-1", severity: "critical", title: "Prompt injection vulnerability detected in HR Screening Pipeline", systemName: "HR Screening Pipeline", timestamp: "3 min ago", category: "Prompt Injection" },
  { id: "a-2", severity: "critical", title: "Bias detected: gender scoring disparity exceeds threshold", systemName: "HR Screening Pipeline", timestamp: "3 min ago", category: "Bias Detection" },
  { id: "a-3", severity: "high", title: "PII exposure risk in claims processing responses", systemName: "Claims Processing LLM", timestamp: "14 min ago", category: "Data Privacy" },
  { id: "a-4", severity: "high", title: "Model drift detected: accuracy dropped 12% in 7 days", systemName: "Medical Imaging Classifier", timestamp: "11 min ago", category: "Model Drift" },
  { id: "a-5", severity: "high", title: "Unencrypted personal data in API responses", systemName: "Credit Risk Scorer", timestamp: "6 min ago", category: "Data Privacy" },
  { id: "a-6", severity: "medium", title: "Third-party model dependency has known vulnerability", systemName: "Claims Processing LLM", timestamp: "14 min ago", category: "Supply Chain" },
  { id: "a-7", severity: "medium", title: "Hallucination rate above acceptable threshold", systemName: "Claims Processing LLM", timestamp: "28 min ago", category: "Performance" },
  { id: "a-8", severity: "medium", title: "EU AI Act transparency documentation incomplete", systemName: "Medical Imaging Classifier", timestamp: "1 hr ago", category: "Compliance" },
  { id: "a-9", severity: "medium", title: "Inconsistent fairness metrics across demographic groups", systemName: "Credit Risk Scorer", timestamp: "1 hr ago", category: "Bias Detection" },
  { id: "a-10", severity: "low", title: "Response latency exceeding SLA in peak hours", systemName: "Customer Service Chatbot", timestamp: "2 hr ago", category: "Performance" },
  { id: "a-11", severity: "low", title: "Minor version mismatch in sentiment model dependency", systemName: "Sentiment Analysis API", timestamp: "3 hr ago", category: "Supply Chain" },
  { id: "a-12", severity: "medium", title: "Data retention policy not enforced on training data", systemName: "HR Screening Pipeline", timestamp: "3 hr ago", category: "Data Privacy" },
  { id: "a-13", severity: "high", title: "System prompt extraction possible via crafted input", systemName: "HR Screening Pipeline", timestamp: "3 min ago", category: "Prompt Injection" },
  { id: "a-14", severity: "low", title: "Recommendation model cold-start performance degraded", systemName: "Product Recommendation AI", timestamp: "5 hr ago", category: "Performance" },
  { id: "a-15", severity: "medium", title: "Insufficient logging for audit trail requirements", systemName: "Document Analysis Engine", timestamp: "6 hr ago", category: "Compliance" },
];

export const vulnerabilities: Vulnerability[] = [
  { id: "v-1", severity: "critical", category: "Prompt Injection", finding: "System prompt can be fully extracted via multi-turn conversation attack", systemName: "HR Screening Pipeline", detectedAt: "19 Feb 2026", status: "open", cvss: 9.8 },
  { id: "v-2", severity: "critical", category: "Bias Detection", finding: "Gender bias in candidate scoring: male candidates score 23% higher on average", systemName: "HR Screening Pipeline", detectedAt: "19 Feb 2026", status: "open", cvss: 9.1 },
  { id: "v-3", severity: "critical", category: "Data Privacy", finding: "Training data contains unredacted personal addresses and phone numbers", systemName: "HR Screening Pipeline", detectedAt: "19 Feb 2026", status: "in-review", cvss: 9.4 },
  { id: "v-4", severity: "high", category: "Data Privacy", finding: "PII from claimant records included in model responses to other users", systemName: "Claims Processing LLM", detectedAt: "19 Feb 2026", status: "open", cvss: 8.6 },
  { id: "v-5", severity: "high", category: "Model Drift", finding: "Diagnostic accuracy dropped from 94.2% to 82.1% over past 7 days", systemName: "Medical Imaging Classifier", detectedAt: "18 Feb 2026", status: "in-review", cvss: 7.8 },
  { id: "v-6", severity: "high", category: "Prompt Injection", finding: "Indirect prompt injection via uploaded claim documents can override safety rules", systemName: "Claims Processing LLM", detectedAt: "18 Feb 2026", status: "open", cvss: 8.2 },
  { id: "v-7", severity: "high", category: "Data Privacy", finding: "Credit check responses include full national insurance numbers", systemName: "Credit Risk Scorer", detectedAt: "18 Feb 2026", status: "open", cvss: 8.4 },
  { id: "v-8", severity: "high", category: "Prompt Injection", finding: "System can be manipulated to ignore content moderation guidelines", systemName: "HR Screening Pipeline", detectedAt: "17 Feb 2026", status: "in-review", cvss: 7.5 },
  { id: "v-9", severity: "medium", category: "Supply Chain", finding: "Third-party embedding model has unpatched CVE-2026-1847 vulnerability", systemName: "Claims Processing LLM", detectedAt: "17 Feb 2026", status: "open", cvss: 6.5 },
  { id: "v-10", severity: "medium", category: "Performance", finding: "Hallucination rate at 4.7% on financial queries, above 2% threshold", systemName: "Claims Processing LLM", detectedAt: "17 Feb 2026", status: "open", cvss: 5.8 },
  { id: "v-11", severity: "medium", category: "Compliance", finding: "Missing transparency documentation required by EU AI Act Article 13", systemName: "Medical Imaging Classifier", detectedAt: "16 Feb 2026", status: "in-review", cvss: 5.2 },
  { id: "v-12", severity: "medium", category: "Bias Detection", finding: "Postcode-correlated bias in credit scoring affecting lower-income areas", systemName: "Credit Risk Scorer", detectedAt: "16 Feb 2026", status: "open", cvss: 6.1 },
  { id: "v-13", severity: "medium", category: "Data Privacy", finding: "Training data retention exceeds GDPR-compliant 24-month limit", systemName: "HR Screening Pipeline", detectedAt: "16 Feb 2026", status: "open", cvss: 5.5 },
  { id: "v-14", severity: "medium", category: "Compliance", finding: "No human oversight mechanism documented for high-risk AI classification", systemName: "HR Screening Pipeline", detectedAt: "15 Feb 2026", status: "in-review", cvss: 6.3 },
  { id: "v-15", severity: "medium", category: "Performance", finding: "Average response latency exceeds 3s SLA during peak trading hours", systemName: "Customer Service Chatbot", detectedAt: "15 Feb 2026", status: "resolved", cvss: 4.2 },
  { id: "v-16", severity: "medium", category: "Supply Chain", finding: "Outdated version of sentiment analysis model dependency (v2.1 vs v3.0)", systemName: "Sentiment Analysis API", detectedAt: "14 Feb 2026", status: "open", cvss: 4.8 },
  { id: "v-17", severity: "low", category: "Performance", finding: "Cold-start recommendation quality drops 18% for new user segments", systemName: "Product Recommendation AI", detectedAt: "14 Feb 2026", status: "open", cvss: 3.2 },
  { id: "v-18", severity: "low", category: "Compliance", finding: "Audit trail logging gaps during system maintenance windows", systemName: "Document Analysis Engine", detectedAt: "13 Feb 2026", status: "resolved", cvss: 2.8 },
  { id: "v-19", severity: "low", category: "Performance", finding: "Minor accuracy regression in low-confidence image classifications", systemName: "Content Moderation AI", detectedAt: "13 Feb 2026", status: "open", cvss: 3.1 },
  { id: "v-20", severity: "low", category: "Supply Chain", finding: "Forecasting model uses deprecated API endpoint scheduled for removal", systemName: "Supply Chain Forecaster", detectedAt: "12 Feb 2026", status: "resolved", cvss: 2.4 },
  { id: "v-21", severity: "medium", category: "Bias Detection", finding: "Age-correlated scoring patterns in medical diagnosis suggestions", systemName: "Medical Imaging Classifier", detectedAt: "12 Feb 2026", status: "in-review", cvss: 5.9 },
  { id: "v-22", severity: "high", category: "Bias Detection", finding: "Ethnicity-correlated disparity in fraud flagging rates", systemName: "Fraud Detection Model", detectedAt: "11 Feb 2026", status: "in-review", cvss: 7.9 },
  { id: "v-23", severity: "low", category: "Data Privacy", finding: "Search query logs retained beyond stated privacy policy period", systemName: "Internal Knowledge Assistant", detectedAt: "10 Feb 2026", status: "resolved", cvss: 2.1 },
  { id: "v-24", severity: "medium", category: "Performance", finding: "Model confidence calibration drift in contract clause extraction", systemName: "Document Analysis Engine", detectedAt: "10 Feb 2026", status: "open", cvss: 4.5 },
  { id: "v-25", severity: "low", category: "Compliance", finding: "Data processing agreement with model provider needs annual renewal", systemName: "Fraud Detection Model", detectedAt: "9 Feb 2026", status: "resolved", cvss: 1.8 },
];

export const complianceFrameworks: ComplianceFramework[] = [
  {
    id: "eu-ai-act",
    name: "EU AI Act",
    overallScore: 72,
    lastAudit: "12 Jan 2026",
    nextAudit: "3 Mar 2026",
    auditor: "Deloitte Digital",
    requirements: [
      { id: "eu-1", name: "Risk Classification", description: "All AI systems classified by risk level per Article 6", status: "compliant", progress: 100 },
      { id: "eu-2", name: "Transparency Obligations", description: "Users informed when interacting with AI per Article 13", status: "in-progress", progress: 65 },
      { id: "eu-3", name: "Human Oversight", description: "Human oversight mechanisms for high-risk AI per Article 14", status: "in-progress", progress: 50 },
      { id: "eu-4", name: "Data Governance", description: "Training data quality and governance per Article 10", status: "non-compliant", progress: 30 },
      { id: "eu-5", name: "Technical Documentation", description: "Complete technical documentation per Annex IV", status: "in-progress", progress: 70 },
      { id: "eu-6", name: "Record Keeping", description: "Automatic logging and audit trails per Article 12", status: "compliant", progress: 95 },
      { id: "eu-7", name: "Accuracy & Robustness", description: "Accuracy, robustness, and cybersecurity per Article 15", status: "in-progress", progress: 60 },
      { id: "eu-8", name: "Conformity Assessment", description: "Self-assessment or third-party assessment completed", status: "non-compliant", progress: 20 },
    ],
  },
  {
    id: "iso-42001",
    name: "ISO 42001",
    overallScore: 85,
    lastAudit: "28 Jan 2026",
    nextAudit: "15 Apr 2026",
    auditor: "BSI Group",
    requirements: [
      { id: "iso-1", name: "AI Policy", description: "Organisation-wide AI management policy established", status: "compliant", progress: 100 },
      { id: "iso-2", name: "Risk Assessment", description: "AI-specific risk assessment framework in place", status: "compliant", progress: 100 },
      { id: "iso-3", name: "Roles & Responsibilities", description: "Clear accountability for AI governance", status: "compliant", progress: 95 },
      { id: "iso-4", name: "Impact Assessment", description: "AI impact assessments for affected stakeholders", status: "in-progress", progress: 75 },
      { id: "iso-5", name: "Data Management", description: "Data lifecycle management for AI systems", status: "in-progress", progress: 70 },
      { id: "iso-6", name: "Monitoring & Measurement", description: "Continuous monitoring of AI system performance", status: "compliant", progress: 90 },
      { id: "iso-7", name: "Continual Improvement", description: "Documented improvement processes for AI systems", status: "in-progress", progress: 65 },
    ],
  },
  {
    id: "nist-ai-rmf",
    name: "NIST AI RMF",
    overallScore: 91,
    lastAudit: "5 Feb 2026",
    nextAudit: "1 May 2026",
    auditor: "PwC Advisory",
    requirements: [
      { id: "nist-1", name: "Govern", description: "AI governance structure and policies established", status: "compliant", progress: 100 },
      { id: "nist-2", name: "Map", description: "AI risks mapped across all systems and contexts", status: "compliant", progress: 95 },
      { id: "nist-3", name: "Measure", description: "Risk metrics and measurement approaches defined", status: "compliant", progress: 90 },
      { id: "nist-4", name: "Manage", description: "Risk treatment and mitigation plans active", status: "in-progress", progress: 80 },
      { id: "nist-5", name: "Trustworthiness", description: "AI trustworthiness characteristics evaluated", status: "compliant", progress: 92 },
      { id: "nist-6", name: "Stakeholder Engagement", description: "Relevant stakeholders involved in AI risk decisions", status: "compliant", progress: 88 },
    ],
  },
];

// ── Activity Feed ──

export interface ActivityItem {
  id: string;
  type: "scan_complete" | "alert_triggered" | "system_connected" | "vulnerability_resolved" | "compliance_updated" | "report_generated";
  title: string;
  description: string;
  timestamp: string;
}

export const activityFeed: ActivityItem[] = [
  { id: "act-1", type: "alert_triggered", title: "Critical alert triggered", description: "Prompt injection vulnerability detected in HR Screening Pipeline", timestamp: "3 min ago" },
  { id: "act-2", type: "scan_complete", title: "Automated scan complete", description: "Full security scan finished for Customer Service Chatbot. 1 finding.", timestamp: "5 min ago" },
  { id: "act-3", type: "vulnerability_resolved", title: "Vulnerability resolved", description: "Response latency issue in Customer Service Chatbot marked as resolved", timestamp: "12 min ago" },
  { id: "act-4", type: "alert_triggered", title: "High severity alert", description: "PII exposure risk detected in Claims Processing LLM responses", timestamp: "14 min ago" },
  { id: "act-5", type: "scan_complete", title: "Automated scan complete", description: "Full security scan finished for Supply Chain Forecaster. No findings.", timestamp: "18 min ago" },
  { id: "act-6", type: "compliance_updated", title: "Compliance status updated", description: "ISO 42001 Impact Assessment moved from In Progress to 75% complete", timestamp: "24 min ago" },
  { id: "act-7", type: "report_generated", title: "Weekly report generated", description: "Automated weekly security summary for all 12 connected systems", timestamp: "1 hr ago" },
  { id: "act-8", type: "system_connected", title: "New system connected", description: "Content Moderation AI successfully integrated via API", timestamp: "2 hr ago" },
  { id: "act-9", type: "scan_complete", title: "Automated scan complete", description: "Full security scan finished for Fraud Detection Model. 2 findings.", timestamp: "2 hr ago" },
  { id: "act-10", type: "vulnerability_resolved", title: "Vulnerability resolved", description: "Audit trail logging gaps in Document Analysis Engine fixed and verified", timestamp: "3 hr ago" },
  { id: "act-11", type: "alert_triggered", title: "Medium severity alert", description: "Data retention policy not enforced on HR Screening Pipeline training data", timestamp: "3 hr ago" },
  { id: "act-12", type: "compliance_updated", title: "Compliance status updated", description: "NIST AI RMF Manage requirement progress updated to 80%", timestamp: "4 hr ago" },
];

// ── Scan History (for charts) ──

export const scanHistory = [
  { day: "Mon", scans: 18, findings: 4 },
  { day: "Tue", scans: 24, findings: 7 },
  { day: "Wed", scans: 21, findings: 3 },
  { day: "Thu", scans: 28, findings: 9 },
  { day: "Fri", scans: 22, findings: 5 },
  { day: "Sat", scans: 12, findings: 2 },
  { day: "Sun", scans: 8, findings: 1 },
];

// ── Category Breakdown ──

export const categoryBreakdown = [
  { category: "Prompt Injection", count: 5, percentage: 20 },
  { category: "Data Privacy", count: 6, percentage: 24 },
  { category: "Bias Detection", count: 4, percentage: 16 },
  { category: "Model Drift", count: 2, percentage: 8 },
  { category: "Compliance", count: 4, percentage: 16 },
  { category: "Supply Chain", count: 3, percentage: 12 },
  { category: "Performance", count: 4, percentage: 16 },
];

// ── Aggregates ──

export const overviewStats = {
  riskScore: 73,
  systemsConnected: systems.length,
  activeAlerts: alerts.filter((a) => a.severity === "critical" || a.severity === "high").length,
  complianceScore: 82,
  scansThisMonth: 156,
  scansLastMonth: 134,
  lastScanTime: "2 minutes ago",
  vulnerabilitiesOpen: vulnerabilities.filter((v) => v.status === "open").length,
  vulnerabilitiesResolved: vulnerabilities.filter((v) => v.status === "resolved").length,
  meanTimeToResolve: "4.2 days",
  systemsHealthy: systems.filter((s) => s.status === "healthy").length,
  systemsWarning: systems.filter((s) => s.status === "warning").length,
  systemsCritical: systems.filter((s) => s.status === "critical").length,
};

export function getAlertCounts() {
  return {
    critical: alerts.filter((a) => a.severity === "critical").length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
  };
}

export function getVulnerabilityCounts() {
  return {
    critical: vulnerabilities.filter((v) => v.severity === "critical").length,
    high: vulnerabilities.filter((v) => v.severity === "high").length,
    medium: vulnerabilities.filter((v) => v.severity === "medium").length,
    low: vulnerabilities.filter((v) => v.severity === "low").length,
  };
}

export function getAlertsBySystem(systemName: string) {
  return alerts.filter((a) => a.systemName === systemName);
}

export function getVulnsBySystem(systemName: string) {
  return vulnerabilities.filter((v) => v.systemName === systemName);
}
