 import { useState, useEffect, useRef } from "react";

const Dashboard = () => {
  return (
    <div>Dashboard</div>
   

const palette = {
  blue: "#185FA5",
  teal: "#1D9E75",
  purple: "#7F77DD",
  coral: "#D85A30",
  amber: "#BA7517",
  gray: "#888780",
  green: "#3B6D11",
  red: "#A32D2D",
};

const RANGES = ["7d", "30d", "90d"];

const DATA = {
  "7d": {
    rev: "$18,420", users: "2,840", conv: "3.2%", sess: "3m 58s",
    revTrend: "+6.1%", usersTrend: "+3.4%", convTrend: "-0.1%", sessTrend: "+2.2%",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    curr: [11, 14, 10, 18, 22, 19, 25],
    prev: [9, 12, 13, 15, 17, 16, 20],
  },
  "30d": {
    rev: "$84,210", users: "12,847", conv: "3.6%", sess: "4m 22s",
    revTrend: "+12.4%", usersTrend: "+8.1%", convTrend: "-0.3%", sessTrend: "+5.7%",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    curr: [28, 33, 29, 45, 52, 48, 61, 57, 70, 65, 78, 84],
    prev: [22, 28, 32, 36, 41, 43, 50, 55, 58, 62, 66, 70],
  },
  "90d": {
    rev: "$241,800", users: "38,120", conv: "4.1%", sess: "4m 45s",
    revTrend: "+18.9%", usersTrend: "+15.2%", convTrend: "+0.5%", sessTrend: "+8.3%",
    labels: ["Q1 W1","Q1 W2","Q1 W3","Q1 W4","Q2 W1","Q2 W2","Q2 W3","Q2 W4","Q3 W1","Q3 W2","Q3 W3","Q3 W4"],
    curr: [55, 60, 72, 80, 70, 88, 95, 100, 110, 108, 120, 130],
    prev: [40, 50, 58, 65, 60, 72, 80, 85, 90, 95, 102, 110],
  },
};

const PAGES = [
  { path: "/home", views: 24810, change: 4.2, up: true },
  { path: "/pricing", views: 18240, change: 11.8, up: true },
  { path: "/docs/getting-started", views: 12900, change: 2.1, up: false },
  { path: "/blog/ai-trends-2025", views: 9430, change: 31.4, up: true },
  { path: "/signup", views: 7820, change: 6.5, up: true },
];

const TRAFFIC = [
  { label: "Organic", pct: 38, color: palette.blue },
  { label: "Direct", pct: 25, color: palette.teal },
  { label: "Paid", pct: 22, color: palette.purple },
  { label: "Referral", pct: 15, color: palette.coral },
];

const NAV_ITEMS = [
  { icon: "📊", label: "Analytics", active: true },
  { icon: "👥", label: "Audience", active: false },
  { icon: "📄", label: "Content", active: false },
  { icon: "💰", label: "Revenue", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

function MiniLineChart({ curr, prev, labels, color }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    if (chartRef.current) chartRef.current.destroy();
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
    const tickColor = isDark ? "#888780" : "#888780";

    chartRef.current = new window.Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data: curr,
            borderColor: color,
            backgroundColor: color + "18",
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2,
          },
          {
            data: prev,
            borderColor: "#B4B2A9",
            backgroundColor: "transparent",
            borderDash: [4, 4],
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 }, maxTicksLimit: 8 } },
          y: {
            grid: { color: gridColor },
            ticks: { color: tickColor, font: { size: 11 }, callback: (v) => "$" + v + "k" },
            beginAtZero: false,
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [curr, prev, labels, color]);

  return (
    <div style={{ position: "relative", width: "100%", height: 200 }}>
      <canvas ref={canvasRef} role="img" aria-label="Revenue line chart" />
    </div>
  );
}

function DonutChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new window.Chart(ctx, {
      type: "doughnut",
      data: {
        labels: TRAFFIC.map((t) => t.label),
        datasets: [
          {
            data: TRAFFIC.map((t) => t.pct),
            backgroundColor: TRAFFIC.map((t) => t.color),
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ctx.label + ": " + ctx.parsed + "%" } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: 160 }}>
      <canvas ref={canvasRef} role="img" aria-label="Traffic sources donut chart" />
    </div>
  );
}

function StatCard({ icon, label, value, trend, up }) {
  return (
    <div
      style={{
        background: "var(--color-bg-secondary, #f5f5f3)",
        borderRadius: 8,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <p style={{ fontSize: 12, color: "#888780", margin: 0 }}>
        <span style={{ marginRight: 4 }}>{icon}</span>
        {label}
      </p>
      <p style={{ fontSize: 24, fontWeight: 500, margin: 0, color: "var(--color-text, #1a1a18)" }}>{value}</p>
      <p style={{ fontSize: 12, margin: 0, color: up ? palette.green : palette.red }}>
        {up ? "▲" : "▼"} {trend}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const [range, setRange] = useState("30d");
  const [chartReady, setChartReady] = useState(false);
  const data = DATA[range];

  useEffect(() => {
    if (window.Chart) { setChartReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    script.onload = () => setChartReady(true);
    document.head.appendChild(script);
  }, []);

  const maxViews = PAGES[0].views;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Georgia', serif",
        background: "var(--color-bg, #f9f8f5)",
        color: "var(--color-text, #1a1a18)",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 200,
          minHeight: "100vh",
          background: "#0c0c0b",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 0",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "0 1.25rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#f5f5f3", margin: 0, letterSpacing: "0.02em" }}>
            ◈ Prism
          </p>
          <p style={{ fontSize: 11, color: "#888780", margin: "4px 0 0" }}>Analytics Suite</p>
        </div>
        <nav style={{ marginTop: "1.5rem", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 1.25rem",
                fontSize: 13,
                cursor: "pointer",
                color: item.active ? "#f5f5f3" : "#888780",
                background: item.active ? "rgba(255,255,255,0.06)" : "transparent",
                borderLeft: item.active ? "2px solid #185FA5" : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: "1rem 1.25rem", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#185FA5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              AK
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#f5f5f3", margin: 0 }}>Aryan K.</p>
              <p style={{ fontSize: 11, color: "#888780", margin: 0 }}>Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "1.75rem 2rem", overflow: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <p style={{ fontSize: 13, color: "#888780", margin: "0 0 2px" }}>Overview</p>
            <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Analytics</h1>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  fontSize: 12,
                  padding: "6px 14px",
                  cursor: "pointer",
                  border: "0.5px solid",
                  borderColor: range === r ? "#185FA5" : "#d3d1c7",
                  borderRadius: 6,
                  background: range === r ? "#e6f1fb" : "transparent",
                  color: range === r ? "#185FA5" : "#888780",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
          <StatCard icon="$" label="Revenue" value={data.rev} trend={data.revTrend} up={data.revTrend.startsWith("+")} />
          <StatCard icon="👤" label="Active users" value={data.users} trend={data.usersTrend} up={data.usersTrend.startsWith("+")} />
          <StatCard icon="🎯" label="Conversion" value={data.conv} trend={data.convTrend} up={data.convTrend.startsWith("+")} />
          <StatCard icon="⏱" label="Avg session" value={data.sess} trend={data.sessTrend} up={data.sessTrend.startsWith("+")} />
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
          {/* Line chart */}
          <div
            style={{
              background: "#ffffff",
              border: "0.5px solid #e0ded7",
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>Revenue over time</p>
              <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#888780" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: palette.blue, display: "inline-block" }} />
                  This period
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 2, background: "#B4B2A9", display: "inline-block" }} />
                  Last period
                </span>
              </div>
            </div>
            {chartReady && <MiniLineChart curr={data.curr} prev={data.prev} labels={data.labels} color={palette.blue} />}
          </div>

          {/* Donut chart */}
          <div
            style={{
              background: "#ffffff",
              border: "0.5px solid #e0ded7",
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 12px" }}>Traffic sources</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              {TRAFFIC.map((t) => (
                <span key={t.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#888780" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, display: "inline-block" }} />
                  {t.label} {t.pct}%
                </span>
              ))}
            </div>
            {chartReady && <DonutChart />}
          </div>
        </div>

        {/* Top pages */}
        <div
          style={{
            background: "#ffffff",
            border: "0.5px solid #e0ded7",
            borderRadius: 12,
            padding: "1.25rem",
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 1rem" }}>Top pages</p>
          {PAGES.map((page, i) => (
            <div
              key={page.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 0",
                borderBottom: i < PAGES.length - 1 ? "0.5px solid #e0ded7" : "none",
              }}
            >
              <span style={{ fontSize: 12, color: "#888780", minWidth: 16, textAlign: "right" }}>{i + 1}</span>
              <span style={{ fontFamily: "monospace", fontSize: 12, minWidth: 220, color: "#1a1a18" }}>{page.path}</span>
              <div style={{ flex: 1, background: "#f5f5f3", borderRadius: 2, height: 6, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: Math.round((page.views / maxViews) * 100) + "%",
                    background: palette.blue,
                    borderRadius: 2,
                  }}
                />
              </div>
              <span style={{ fontSize: 13, minWidth: 60, textAlign: "right" }}>{page.views.toLocaleString()}</span>
              <span style={{ fontSize: 12, minWidth: 52, textAlign: "right", color: page.up ? palette.green : palette.red }}>
                {page.up ? "▲" : "▼"} {page.change}%
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

  
}

export default Dashboard;