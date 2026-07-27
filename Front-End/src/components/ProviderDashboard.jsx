import React, { useMemo } from 'react';
import {
  BookOpen, Users, GraduationCap, ShieldCheck, PlusCircle,
  ArrowRight, AlertCircle, ChevronRight, Banknote, CalendarDays
} from 'lucide-react';
import { MOCK_PROGRAMS } from './ProviderPrograms';
import './ProviderDashboard.css';

/* ── Mock Pipeline ─────────────────────────────── */
const PIPELINE = {
  'prog-1': { pending: 2140, underReview: 1480, accepted: 342 },
  'prog-2': { pending: 0,    underReview: 0,    accepted: 250 },
  'prog-3': { pending: 310,  underReview: 180,  accepted: 48  },
  'prog-4': { pending: 0,    underReview: 0,    accepted: 0   },
  'prog-5': { pending: 0,    underReview: 0,    accepted: 205 },
};

const MONTHLY = [
  { month: 'Jan', count: 420  },
  { month: 'Feb', count: 680  },
  { month: 'Mar', count: 1240 },
  { month: 'Apr', count: 990  },
  { month: 'May', count: 1580 },
  { month: 'Jun', count: 2100 },
  { month: 'Jul', count: 2870 },
];

/* ── Pure-SVG Donut (single blue palette) ──────── */
const DonutChart = ({ segments, size = 120, stroke = 22 }) => {
  const r   = (size - stroke) / 2;
  const cx  = size / 2;
  const cy  = size / 2;
  const C   = 2 * Math.PI * r;
  const tot = segments.reduce((s, d) => s + d.value, 0);

  let off = 0;
  const arcs = segments.map(seg => {
    const dash = tot > 0 ? (seg.value / tot) * C : 0;
    const a = { ...seg, dash, offset: off };
    off += dash;
    return a;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      {tot > 0 && arcs.map((a, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={a.color} strokeWidth={stroke}
          strokeDasharray={`${a.dash} ${C - a.dash}`}
          strokeDashoffset={-a.offset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
};

/* ── Pure-SVG Bar Chart ────────────────────────── */
const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.count));
  const W = 500, H = 130;
  const PL = 14, PR = 14, PT = 10, PB = 30;
  const chartW = W - PL - PR;
  const chartH = H - PT - PB;
  const bw = chartW / data.length - 8;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="dbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#082894" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* Gridlines */}
      {[0, 0.5, 1].map((p, i) => (
        <line key={i}
          x1={PL} x2={W - PR}
          y1={PT + chartH * (1 - p)} y2={PT + chartH * (1 - p)}
          stroke="#f1f5f9" strokeWidth="1"
        />
      ))}
      {data.map((d, i) => {
        const bh = max > 0 ? (d.count / max) * chartH : 0;
        const x  = PL + i * (chartW / data.length) + 4;
        const y  = PT + chartH - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="4" fill="url(#dbg)" />
            <text x={x + bw / 2} y={H - PB + 16} textAnchor="middle"
              fontSize="9" fill="#94a3b8" fontWeight="600">{d.month}</text>
            {bh > 20 && (
              <text x={x + bw / 2} y={y + 12} textAnchor="middle"
                fontSize="8" fill="#fff" fontWeight="700">
                {d.count > 999 ? `${(d.count/1000).toFixed(1)}k` : d.count}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* ── Main Component ────────────────────────────── */
const ProviderDashboard = ({ setActiveView }) => {
  const programs = MOCK_PROGRAMS;

  const kpis = useMemo(() => {
    const allPipe = Object.values(PIPELINE);
    return {
      published:   programs.filter(p => p.status === 'Published').length,
      totalApps:   programs.reduce((s, p) => s + p.applicantsCount, 0),
      totalFilled: programs.reduce((s, p) => s + p.slotsFilled, 0),
      totalSlots:  programs.reduce((s, p) => s + p.totalSlots, 0),
      usedBudget:  programs.reduce((s, p) => s + p.budgetSpent, 0),
      totalBudget: programs.reduce((s, p) => s + p.budgetTotal, 0),
      pending:     allPipe.reduce((s, p) => s + p.pending, 0),
      underReview: allPipe.reduce((s, p) => s + p.underReview, 0),
      accepted:    allPipe.reduce((s, p) => s + p.accepted, 0),
    };
  }, [programs]);

  const verifApp = (() => {
    try { return JSON.parse(localStorage.getItem('provider_verification') || 'null'); }
    catch { return null; }
  })();

  /* Donut segments — blue shades only */
  const statusSegs = [
    { label: 'Published', value: programs.filter(p => p.status === 'Published').length, color: '#082894' },
    { label: 'Draft',     value: programs.filter(p => p.status === 'Draft').length,     color: '#3b82f6' },
    { label: 'Paused',    value: programs.filter(p => p.status === 'Paused').length,    color: '#93c5fd' },
    { label: 'Closed',    value: programs.filter(p => p.status === 'Closed').length,    color: '#dbeafe' },
  ];

  const pipeSegs = [
    { label: 'Pending',      value: kpis.pending,     color: '#082894' },
    { label: 'Under Review', value: kpis.underReview, color: '#3b82f6' },
    { label: 'Accepted',     value: kpis.accepted,    color: '#93c5fd' },
  ];

  return (
    <div className="pd-page">

      {/* ── Header ── */}
      <div className="pd-header">
        <div>
          <h2 className="pd-title">Dashboard</h2>
          <p className="pd-subtitle">Welcome back, <strong>Divina Ramos</strong> · CHED Region IV-A</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {!verifApp || verifApp.status !== 'Approved' ? (
            <button className="pd-verif-btn" onClick={() => setActiveView('verification')}>
              <AlertCircle size={14} />
              {verifApp ? `Verification: ${verifApp.status}` : 'Complete Verification'}
            </button>
          ) : (
            <span className="pd-verified-badge"><ShieldCheck size={14} /> Verified</span>
          )}
          <button className="pd-primary-btn" onClick={() => setActiveView('create-program')}>
            <PlusCircle size={15} /> New Scholarship
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="pd-kpi-grid">
        {[
          { icon: <BookOpen size={19} />, label: 'Active Programs',  value: kpis.published,                         sub: `${programs.length} total` },
          { icon: <Users size={19} />,    label: 'Total Applicants', value: kpis.totalApps.toLocaleString(),        sub: `${kpis.pending.toLocaleString()} pending` },
          { icon: <GraduationCap size={19} />, label: 'Active Scholars', value: kpis.totalFilled.toLocaleString(), sub: `of ${kpis.totalSlots.toLocaleString()} slots` },
          { icon: <Banknote size={19} />, label: 'Budget Disbursed', value: `₱${(kpis.usedBudget/1e6).toFixed(1)}M`, sub: `of ₱${(kpis.totalBudget/1e6).toFixed(1)}M` },
        ].map(({ icon, label, value, sub }) => (
          <div key={label} className="pd-kpi-card">
            <div className="pd-kpi-icon">{icon}</div>
            <div>
              <p className="pd-kpi-label">{label}</p>
              <p className="pd-kpi-value">{value}</p>
              <p className="pd-kpi-sub">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="pd-charts-row">

        {/* Program Status Donut */}
        <div className="pd-card">
          <p className="pd-card-title">Program Status</p>
          <p className="pd-card-sub">Distribution of your scholarship programs.</p>
          <div className="pd-donut-wrap">
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <DonutChart segments={statusSegs} size={120} stroke={22} />
              <div className="pd-donut-center">
                <span className="pd-donut-val">{programs.length}</span>
                <span className="pd-donut-lbl">total</span>
              </div>
            </div>
            <div className="pd-legend">
              {statusSegs.map(s => (
                <div key={s.label} className="pd-legend-row">
                  <span className="pd-legend-dot" style={{ background: s.color }} />
                  <span className="pd-legend-label">{s.label}</span>
                  <span className="pd-legend-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applicant Pipeline Donut */}
        <div className="pd-card">
          <p className="pd-card-title">Applicant Pipeline</p>
          <p className="pd-card-sub">Current review stage breakdown.</p>
          <div className="pd-donut-wrap">
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <DonutChart segments={pipeSegs} size={120} stroke={22} />
              <div className="pd-donut-center">
                <span className="pd-donut-val">{kpis.totalApps.toLocaleString()}</span>
                <span className="pd-donut-lbl">total</span>
              </div>
            </div>
            <div className="pd-legend">
              {pipeSegs.map(s => (
                <div key={s.label} className="pd-legend-row">
                  <span className="pd-legend-dot" style={{ background: s.color }} />
                  <span className="pd-legend-label">{s.label}</span>
                  <span className="pd-legend-val">{s.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trend Bar */}
        <div className="pd-card pd-card-wide">
          <p className="pd-card-title">Monthly Applicant Volume — 2026</p>
          <p className="pd-card-sub">Applicants submitted per month across all programs.</p>
          <div style={{ marginTop: '1rem' }}>
            <BarChart data={MONTHLY} />
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="pd-bottom-row">

        {/* Slot Utilization */}
        <div className="pd-card">
          <p className="pd-card-title">Slot Utilization</p>
          <p className="pd-card-sub">Filled vs. total slots per program.</p>
          <div className="pd-slot-list">
            {programs.filter(p => p.status !== 'Draft').slice(0, 4).map(prog => {
              const pct = Math.round((prog.slotsFilled / prog.totalSlots) * 100);
              return (
                <div key={prog.id} className="pd-slot-row" onClick={() => setActiveView('my-programs')}>
                  <div className="pd-slot-top">
                    <span className="pd-slot-name">{prog.title}</span>
                    <span className="pd-slot-pct">{pct}%</span>
                  </div>
                  <div className="pd-slot-track">
                    <div className="pd-slot-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="pd-slot-frac">{prog.slotsFilled} / {prog.totalSlots} slots</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pd-card">
          <p className="pd-card-title">Quick Actions</p>
          <p className="pd-card-sub">Navigate to key modules.</p>
          <div className="pd-action-list">
            {[
              { label: 'Create Scholarship',   sub: 'Launch a new program',        view: 'create-program',   icon: <PlusCircle size={16} /> },
              { label: 'My Scholarships',      sub: 'Manage your programs',        view: 'my-programs',      icon: <BookOpen size={16} /> },
              { label: 'Applicant Pipeline',   sub: 'Review submitted applicants', view: 'applicants',       icon: <Users size={16} /> },
              { label: 'Active Scholars',      sub: 'Track grant recipients',      view: 'active-scholars',  icon: <GraduationCap size={16} /> },
              { label: 'Provider Verification',sub: 'Accreditation status',        view: 'verification',     icon: <ShieldCheck size={16} /> },
            ].map(({ label, sub, view, icon }) => (
              <button key={view} className="pd-action-row" onClick={() => setActiveView(view)}>
                <div className="pd-action-icon">{icon}</div>
                <div>
                  <p className="pd-action-label">{label}</p>
                  <p className="pd-action-sub">{sub}</p>
                </div>
                <ChevronRight size={14} color="#94a3b8" style={{ marginLeft: 'auto' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Open Windows + Attention */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {(programs.filter(p => p.status === 'Draft' || p.status === 'Paused').length > 0) && (
            <div className="pd-card">
              <p className="pd-card-title">Needs Attention</p>
              <div className="pd-attn-list">
                {programs.filter(p => p.status === 'Draft' || p.status === 'Paused').map(p => (
                  <div key={p.id} className="pd-attn-row" onClick={() => setActiveView('my-programs')}>
                    <AlertCircle size={14} color="#d97706" style={{ flexShrink: 0 }} />
                    <div>
                      <p className="pd-attn-prog">{p.title}</p>
                      <p className="pd-attn-note">{p.status === 'Draft' ? 'Draft — publish to accept applicants' : 'Paused — resume to accept applications'}</p>
                    </div>
                    <ArrowRight size={13} color="#94a3b8" style={{ flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pd-card">
            <p className="pd-card-title">Open Application Windows</p>
            <p className="pd-card-sub">Published programs with active deadlines.</p>
            <div className="pd-deadline-list">
              {programs.filter(p => p.status === 'Published').slice(0, 3).map(prog => (
                <div key={prog.id} className="pd-deadline-row" onClick={() => setActiveView('my-programs')}>
                  <div className="pd-deadline-dot" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="pd-deadline-name">{prog.title}</p>
                    <p className="pd-deadline-date">Closes {prog.endDate}</p>
                  </div>
                  <span className="pd-deadline-chip">{prog.totalSlots - prog.slotsFilled} left</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
