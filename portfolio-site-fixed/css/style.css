:root {
  --bg: #F6F3EC;
  --bg-card: #FFFFFF;
  --ink: #1F2A24;
  --ink-soft: #5C6B62;
  --line: #DDD8CC;
  --accent: #1F6F50;
  --accent-soft: #E4EFE6;
  --gain: #1F6F50;
  --loss: #B5402C;
  --gain-bg: #E4EFE6;
  --loss-bg: #FBE9E4;
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.5;
}

a { color: inherit; text-decoration: none; }

.wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------- Header ---------- */
header.site-header {
  border-bottom: 1px solid var(--line);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
}

.logo {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.logo .dot { color: var(--accent); }

nav.main-nav {
  display: flex;
  gap: 28px;
}

nav.main-nav a {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-soft);
  padding: 6px 0;
  border-bottom: 2px solid transparent;
  transition: color .15s, border-color .15s;
}

nav.main-nav a:hover,
nav.main-nav a.active {
  color: var(--ink);
  border-bottom-color: var(--accent);
}

/* ---------- Hero ---------- */
.hero {
  padding: 64px 0 48px;
  border-bottom: 1px solid var(--line);
}

.hero .eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin: 0 0 14px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(36px, 6vw, 58px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 18px;
  max-width: 14ch;
}

.hero p.lead {
  font-size: 17px;
  color: var(--ink-soft);
  max-width: 46ch;
  margin: 0 0 28px;
}

.ticker-bar {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 13px;
}

.ticker-bar .tick { display: flex; gap: 8px; align-items: baseline; }
.ticker-bar .tick .sym { color: var(--ink-soft); }
.ticker-bar .tick .chg.up { color: var(--gain); }
.ticker-bar .tick .chg.down { color: var(--loss); }

/* ---------- Section headings ---------- */
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 56px 0 24px;
}

.section-head h2 {
  font-family: var(--font-display);
  font-size: 28px;
  margin: 0;
  letter-spacing: -0.01em;
}

.section-head .meta {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-soft);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ---------- News grid ---------- */
.news-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0;
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
}

.news-feature {
  padding: 32px;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 280px;
}

.news-feature .cat {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: 14px;
}

.news-feature h3 {
  font-family: var(--font-display);
  font-size: 30px;
  line-height: 1.15;
  margin: 0 0 14px;
}

.news-feature p {
  color: var(--ink-soft);
  font-size: 15px;
  margin: 0;
}

.news-feature .src {
  margin-top: 24px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-soft);
}

.news-side {
  display: flex;
  flex-direction: column;
}

.news-row {
  padding: 20px 28px;
  border-bottom: 1px solid var(--line);
}

.news-row:last-child { border-bottom: none; }

.news-row .cat {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-soft);
  margin-bottom: 6px;
}

.news-row h4 {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px;
  line-height: 1.3;
}

.news-row .src {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-soft);
}

.news-grid-secondary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.news-card {
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 20px;
}

.news-card .cat {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 8px;
}

.news-card h4 {
  font-size: 15px;
  margin: 0 0 6px;
  line-height: 1.35;
}

.news-card p {
  font-size: 13px;
  color: var(--ink-soft);
  margin: 0 0 10px;
}

.news-card .src {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-soft);
}

.refresh-note {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-soft);
  margin-top: 12px;
}

/* ---------- Portfolio page ---------- */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 32px;
}

.summary-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 18px 20px;
}

.summary-card .label {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-soft);
  margin-bottom: 10px;
}

.summary-card .value {
  font-family: var(--font-mono);
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.summary-card .value.up { color: var(--gain); }
.summary-card .value.down { color: var(--loss); }

/* Add form */
.add-form {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 32px;
}

.add-form h3 {
  font-family: var(--font-display);
  font-size: 20px;
  margin: 0 0 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr auto;
  gap: 12px;
  align-items: end;
}

.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-group label {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
}

.form-group input {
  font-family: var(--font-mono);
  font-size: 14px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 3px;
  background: var(--bg);
  color: var(--ink);
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent);
}

.btn {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 11px 20px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity .15s;
}

.btn:hover { opacity: 0.85; }

.btn.secondary {
  background: transparent;
  color: var(--accent);
}

.form-hint {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-soft);
  margin-top: 12px;
}

/* Holdings table */
.holdings-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
}

.holdings-table th,
.holdings-table td {
  padding: 14px 16px;
  text-align: right;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
}

.holdings-table th {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  font-weight: 500;
  background: var(--accent-soft);
}

.holdings-table th:first-child,
.holdings-table td:first-child {
  text-align: left;
}

.holdings-table td.name {
  font-weight: 600;
}

.holdings-table td.ticker {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-soft);
}

.holdings-table td,
.holdings-table th { font-family: var(--font-mono); }

.holdings-table td.name-cell { font-family: var(--font-body); }

.holdings-table tr:last-child td { border-bottom: none; }

.pill {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.pill.up { background: var(--gain-bg); color: var(--gain); }
.pill.down { background: var(--loss-bg); color: var(--loss); }
.pill.flat { background: var(--accent-soft); color: var(--ink-soft); }

.row-actions button {
  font-family: var(--font-mono);
  font-size: 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink-soft);
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.row-actions button:hover {
  border-color: var(--loss);
  color: var(--loss);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 14px;
  border: 1px dashed var(--line);
  border-radius: 4px;
}

/* ---------- Footer ---------- */
footer {
  border-top: 1px solid var(--line);
  margin-top: 64px;
  padding: 32px 0 48px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-soft);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

/* ---------- Responsive ---------- */
@media (max-width: 860px) {
  .news-grid { grid-template-columns: 1fr; }
  .news-feature { border-right: none; border-bottom: 1px solid var(--line); }
  .news-grid-secondary { grid-template-columns: 1fr; }
  .summary-grid { grid-template-columns: repeat(2, 1fr); }
  .form-row { grid-template-columns: 1fr; }
  nav.main-nav { gap: 16px; }
  .holdings-table { display: block; overflow-x: auto; white-space: nowrap; }
}
