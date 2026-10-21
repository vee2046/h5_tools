/* ABOUTME: 宝盒是怎样月光的 —— 可用现金预测 / 红线预警 / 视图渲染 / localStorage 持久化 */
"use strict";

/* ================= SVG 图标库（线性，stroke=2） ================= */
const svg = (paths, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const I = {
  box: (s) => svg('<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>', s),
  up: (s) => svg('<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>', s),
  down: (s) => svg('<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>', s),
  card: (s) => svg('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', s),
  cal: (s) => svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>', s),
  chart: (s) => svg('<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>', s),
  sliders: (s) => svg('<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>', s),
  plus: (s) => svg('<path d="M5 12h14"/><path d="M12 5v14"/>', s),
  trash: (s) => svg('<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>', s),
  search: (s) => svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', s),
  chevR: (s) => svg('<path d="m9 18 6-6-6-6"/>', s),
  chevL: (s) => svg('<path d="m15 18-6-6 6-6"/>', s),
  chevD: (s) => svg('<path d="m6 9 6 6 6-6"/>', s),
  chevU: (s) => svg('<path d="m18 15-6-6-6 6"/>', s),
  alert: (s) => svg('<path d="m10.29 3.86-8.47 14.14a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>', s),
  shield: (s) => svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>', s),
  gauge: (s) => svg('<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>', s),
  coins: (s) => svg('<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>', s),
  banknote: (s) => svg('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01"/><path d="M18 12h.01"/>', s),
  receipt: (s) => svg('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>', s),
  tag: (s) => svg('<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>', s),
  check: (s) => svg('<path d="M20 6 9 17l-5-5"/>', s),
  flag: (s) => svg('<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>', s),
  clock: (s) => svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', s),
  layers: (s) => svg('<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>', s),
  sparkles: (s) => svg('<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>', s),
  x: (s) => svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', s),
};

/* ================= 红线口径 ================= */
/* 唯一警示 = 月光警示：当月可用现金（收入 − 到期分期）− 月最低支出 < 0；余额不低于最低支出时不做任何警示；警示仅限当月，不做跨月预警 */
const HORIZON = 36; // 无分期或分期不足时的默认展示月数

/* ================= 状态与持久化 ================= */
const LS_KEY = "baobox.v1";
const DEFAULTS = { salary: 0, minExpense: 0, installments: [] };

const clampNum = (v, min = -Infinity) => {
  const n = parseFloat(v);
  if (isNaN(n)) return 0;
  return Math.max(min, n);
};

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { ...DEFAULTS };
    const d = JSON.parse(raw);
    return {
      salary: clampNum(d.salary, 0),
      minExpense: clampNum(d.minExpense, 0),
      installments: Array.isArray(d.installments)
        ? d.installments
            .filter((it) => it && clampNum(it.monthly, 0) > 0 && clampNum(it.periods, 1) >= 1 && /^\d{4}-\d{2}$/.test(it.start || ""))
            .map((it) => ({
              id: String(it.id || Math.random().toString(36).slice(2)),
              name: String(it.name || "").slice(0, 12),
              monthly: clampNum(it.monthly, 0),
              periods: Math.min(360, Math.round(clampNum(it.periods, 1))),
              start: it.start,
            }))
        : [],
    };
  } catch (e) {
    return { ...DEFAULTS };
  }
}

let state = load();

const ui = { view: "overview", expanded: false, queryMonth: null, compareSel: null, cmpMonth: null, instFilter: { q: "", status: "all", page: 1 } };

let saveTimer = null;
function save(immediate = false) {
  clearTimeout(saveTimer);
  if (immediate) {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } else {
    saveTimer = setTimeout(() => localStorage.setItem(LS_KEY, JSON.stringify(state)), 250);
  }
}

/* ================= 月份工具 ================= */
const nowKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};
const parseK = (k) => {
  const [y, m] = k.split("-").map(Number);
  return { y, m };
};
const toKey = (y, m) => `${y}-${String(m).padStart(2, "0")}`;
const addMonths = (k, n) => {
  const { y, m } = parseK(k);
  const t = y * 12 + (m - 1) + n;
  return toKey(Math.floor(t / 12), (t % 12) + 1);
};
const diffMonths = (a, b) => {
  const A = parseK(a);
  const B = parseK(b);
  return (B.y - A.y) * 12 + (B.m - A.m);
};
const fullLabel = (k) => {
  const { y, m } = parseK(k);
  return `${y}年${m}月`;
};
const shortLabel = (k) => {
  const { y, m } = parseK(k);
  return y === new Date().getFullYear() ? `${m}月` : `${String(y).slice(2)}/${m}月`;
};

/* ================= 金额格式化 ================= */
const fmt = (n) => (n < 0 ? "-¥" : "¥") + Math.abs(n).toLocaleString("zh-CN", { maximumFractionDigits: 2 });
const fmt0 = (n) => Math.abs(n).toLocaleString("zh-CN", { maximumFractionDigits: 2 });
const shortNum = (v) => {
  const a = Math.abs(v);
  const s = v < 0 ? "-" : "";
  if (a >= 10000) return s + (a / 10000).toFixed(1).replace(/\.0$/, "") + "万";
  if (a >= 1000) return s + (a / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return s + Math.round(a);
};
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ================= 可用现金计算 ================= */
/* 口径：某月可用现金 = 当月收入 − 当月到期分期月供；逐月独立、不跨月累加 */
function dueOf(item, k) {
  const d = diffMonths(item.start, k);
  return d >= 0 && d < item.periods ? item.monthly : 0;
}

function monthFlow(k, items = state.installments) {
  let due = 0;
  const actives = [];
  items.forEach((it) => {
    const d = dueOf(it, k);
    if (d > 0) actives.push({ it, amt: d });
    due += d;
  });
  /* 可用现金 = 收入 − 当月到期分期；月最低支出不在现金中扣减，而是作为月光红线水位（见 riskOf） */
  return { income: state.salary, minExpense: state.minExpense, due, net: state.salary - due, actives };
}

function balanceAt(k, items = state.installments) {
  /* 当月口径：每月可用现金独立计算，对过去月份同样成立（供对比页回溯） */
  return monthFlow(k, items).net;
}

function furthestKey(items = state.installments) {
  const cur = nowKey();
  let f = addMonths(cur, HORIZON);
  items.forEach((it) => {
    const end = addMonths(it.start, it.periods - 1);
    if (diffMonths(f, end) > 0) f = end;
  });
  return f;
}

const remainingPeriods = (it) => {
  const elapsed = Math.max(0, diffMonths(it.start, nowKey()));
  return Math.max(0, Math.min(it.periods, it.periods - elapsed));
};

/* 红线判定：status = danger(月光，当月可用现金 − 月最低支出 < 0) / safe */
function riskOf(k, items = state.installments) {
  const f = monthFlow(k, items);
  const bal = f.net;
  const line = state.minExpense; // 月光红线水位；未配置月最低支出时退化为 0
  const status = bal < line ? "danger" : "safe";
  return { f, bal, line, status };
}

/* 未来 6 个月前瞻：月光月数/累计超支（低于水位的缺口合计）/恢复月。恢复扫描不限于 6 个月窗口（至 furthestKey）；恢复超 12 个月或不可预见 → critical 顶级警示 */
function forecastSummary() {
  const cur = nowKey();
  const line = state.minExpense;
  let moonCount = 0;
  let totalGap = 0;
  let lastMoonI = -1;
  for (let i = 0; i < 6; i++) {
    const r = riskOf(addMonths(cur, i));
    if (r.status === "danger") {
      moonCount++;
      totalGap += line - r.bal;
      lastMoonI = i;
    }
  }
  if (!moonCount) return { level: "safe", moonCount: 0, totalGap: 0, recoverKey: null, recoverIn: 0 };
  const maxI = diffMonths(cur, furthestKey());
  let recoverKey = null;
  let recoverIn = 0;
  for (let i = lastMoonI + 1; i <= maxI; i++) {
    const k = addMonths(cur, i);
    if (riskOf(k).status === "safe") {
      recoverKey = k;
      recoverIn = i;
      break;
    }
  }
  const level = !recoverKey || recoverIn > 12 ? "critical" : "danger";
  return { level, moonCount, totalGap, recoverKey, recoverIn };
}

const hasData = () => !!(state.salary || state.minExpense || state.installments.length);

/* ================= DOM ================= */
const $ = (id) => document.getElementById(id);
const els = {
  todayPill: $("todayPill"),
  tabbar: $("tabbar"),
  heroWrap: $("heroWrap"),
  alertWrap: $("alertWrap"),
  guideWrap: $("guideWrap"),
  overviewHead: $("overviewHead"),
  monthList: $("monthList"),
  expandWrap: $("expandWrap"),
  queryCard: $("queryCard"),
  queryResult: $("queryResult"),
  comparePick: $("comparePick"),
  compareAdd: $("compareAdd"),
  compareChart: $("compareChart"),
  compareSummary: $("compareSummary"),
  baseCard: $("baseCard"),
  instCard: $("instCard"),
  dangerZone: $("dangerZone"),
  toast: $("toast"),
};

let toastTimer = null;
function toast(msg, icon = I.check(14)) {
  els.toast.innerHTML = `${icon}<span>${msg}</span>`;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1800);
}

/* ================= 弹窗组件（提示 / 确认，替代原生 alert/confirm） ================= */
function showSheet({
  icon,
  tone = "info",
  title,
  msg = "",
  bodyHTML = "",
  okText = "我知道了",
  cancelText = "取消",
  showCancel = false,
  validate = null,
}) {
  return new Promise((resolve) => {
    const mask = document.createElement("div");
    mask.className = "modal-mask";
    mask.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
        <span class="modal-ic ${tone}">${icon}</span>
        <b>${esc(title)}</b>
        ${msg ? `<p>${esc(msg)}</p>` : ""}
        ${bodyHTML}
        <div class="modal-btns">
          ${showCancel ? `<button class="btn btn-ghost" data-act="no">${esc(cancelText)}</button>` : ""}
          <button class="btn" data-act="ok">${esc(okText)}</button>
        </div>
      </div>`;
    document.body.appendChild(mask);
    let closed = false;
    const close = (val) => {
      if (closed) return;
      closed = true;
      mask.classList.add("out");
      setTimeout(() => mask.remove(), 180);
      resolve(val);
    };
    mask.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (btn) {
        if (btn.dataset.act === "ok" && validate) {
          const r = validate();
          if (r === false) return; /* 校验失败保持弹窗 */
          close(r);
          return;
        }
        close(btn.dataset.act === "ok");
        return;
      }
      if (e.target === mask) close(false);
    });
  });
}
const showAlert = (o) => showSheet({ ...o, showCancel: false });
const showConfirm = (o) => showSheet({ ...o, showCancel: true });

/* ================= 支出试算（预测） ================= */
function predictReport(sim) {
  const cur = nowKey();
  const items = [...state.installments, sim];
  const f1 = monthFlow(cur, items);

  /* 只收集该笔支出在当月触发的警示（警示仅限当月；未来月份见下方逐月清单） */
  const warns = [];
  if (f1.net < state.minExpense)
    warns.push({
      icon: I.alert(14),
      text:
        state.minExpense > 0
          ? `本月可用现金将跌破最低支出红线，仅余 <b>${fmt(f1.net)}</b>，低于必要开销 ${fmt(state.minExpense)}`
          : `本月可用现金将转负 <b>${fmt(f1.net)}</b>，当月入不敷出`,
    });

  /* 分期起止月余额变化（起始月≠本月时补充；逐月独立口径下受影响月份每月恰好减少一个月供额） */
  const notes = [];
  if (sim.start !== cur) {
    const endKey = addMonths(sim.start, sim.periods - 1);
    const fStart = monthFlow(sim.start, items);
    const fEnd = monthFlow(endKey, items);
    if (sim.periods === 1) {
      notes.push({
        icon: I.cal(14),
        text: `<b>${fullLabel(sim.start)}</b> 一次性支出 <b>${fmt(sim.monthly)}</b>：当月可用现金 <b>${fmt(fStart.net)}</b>${fStart.net < state.minExpense ? "，将月光" : ""}`,
      });
    } else {
      notes.push({
        icon: I.flag(14),
        text: `<b>${fullLabel(sim.start)}</b> 开始扣款：当月可用现金 <b>${fmt(fStart.net)}</b>${fStart.net < state.minExpense ? "（月光）" : ""}，每月减少 ${fmt(sim.monthly)}`,
      });
      notes.push({
        icon: I.check(14),
        text: `<b>${fullLabel(endKey)}</b> 最后一期：当月可用现金 <b>${fmt(fEnd.net)}</b>${fEnd.net < state.minExpense ? "（月光）" : ""}，次月起每月释放 ${fmt(sim.monthly)}`,
      });
    }
  }

  const warnRows = [
    ...(warns.length
      ? warns.map((w) => `<div class="warn-item"><span class="wic">${w.icon}</span><span>${w.text}</span></div>`)
      : [`<div class="warn-item warn-safe"><span class="wic">${I.check(14)}</span><span>扛得住——宝盒依然充盈，这笔支出不会触碰任何红线。</span></div>`]),
    ...notes.map((n) => `<div class="warn-item note"><span class="wic">${n.icon}</span><span>${n.text}</span></div>`),
  ];
  const warnsHtml = `<div class="warn-list">${warnRows.join("")}</div>`;

  /* 期数内每月可用现金（加入该笔支出后的口径） */
  const monthRows = [];
  for (let i = 0; i < sim.periods; i++) {
    const k = addMonths(sim.start, i);
    monthRows.push({ k, net: monthFlow(k, items).net });
  }
  const listHtml = `
    <div class="pm-title">${I.cal(12)} 期数内每月可用现金 · ${sim.periods} 个月</div>
    <div class="pm-list">${monthRows
      .map((r) => `<div class="pm-row${r.net < state.minExpense ? " neg" : ""}"><span>${fullLabel(r.k)}</span><b>${r.net < state.minExpense ? I.alert(11) : ""}${fmt(r.net)}</b></div>`)
      .join("")}</div>`;

  return { html: warnsHtml + listHtml, worse: warns.length > 0 };
}

async function openPredict() {
  const cur = nowKey();
  const val = await showSheet({
    icon: I.sparkles(22),
    tone: "info",
    title: "新增支出预测",
    msg: "输入一笔模拟支出（期数填 1 即一次性支出），不影响真实数据。",
    bodyHTML: `<div class="modal-form">
      <div class="grid2">
        <label class="field">${I.banknote(17)}<input id="simAmt" type="number" min="0" inputmode="decimal" placeholder="每期 ¥"></label>
        <label class="field">${I.clock(17)}<input id="simPeriods" type="number" min="1" max="360" inputmode="numeric" placeholder="期数"></label>
      </div>
      <label class="field">${I.cal(17)}<input id="simStart" type="month" value="${cur}" min="${cur}"></label>
    </div>`,
    okText: "开始预测",
    cancelText: "取消",
    showCancel: true,
    validate: () => {
      const amt = Number($("simAmt").value);
      const periods = parseInt($("simPeriods").value, 10);
      if (!(amt > 0)) {
        toast("请填写每期金额", I.alert(14));
        return false;
      }
      if (!(periods >= 1) || periods > 360) {
        toast("期数需为 1-360", I.alert(14));
        return false;
      }
      return { monthly: amt, periods, start: $("simStart").value || cur };
    },
  });
  if (!val) return;
  const sim = { id: "sim", name: "试算支出", monthly: val.monthly, periods: val.periods, start: val.start };
  const report = predictReport(sim);
  const saveIt = await showSheet({
    icon: report.worse ? I.alert(22) : I.shield(22),
    tone: report.worse ? "danger" : "info",
    title: report.worse ? "预测警示" : "预测结果",
    msg: report.worse ? `模拟 ¥${fmt0(sim.monthly)}/期 × ${sim.periods} 期（${fullLabel(sim.start)}起）后将触发：` : "",
    bodyHTML: report.html,
    okText: "保存为分期",
    cancelText: "仅试算",
    showCancel: true,
  });
  if (!saveIt) return;
  state.installments.push({ ...sim, id: Date.now().toString(36) });
  save(true);
  renderAll();
  toast("已加入分期", I.check(14));
}

/* ================= 底部导航 ================= */
const TABS = [
  { id: "overview", icon: I.box, label: "总览" },
  { id: "query", icon: I.search, label: "查询" },
  { id: "compare", icon: I.chart, label: "对比" },
  { id: "settings", icon: I.sliders, label: "设置" },
];

function renderTabbar() {
  els.tabbar.innerHTML = TABS.map(
    (t) =>
      `<button class="tab ${ui.view === t.id ? "on" : ""}" data-view="${t.id}" aria-label="${t.label}">${t.icon(21)}<span>${t.label}</span></button>`
  ).join("");
}

function switchView(id) {
  ui.view = id;
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("is-active", v.dataset.view === id));
  renderAll();
  window.scrollTo({ top: 0 });
}

/* ================= 总览：主卡 / 红线预警 / 月列表 ================= */
function renderHero() {
  const cur = nowKey();
  const r = riskOf(cur);
  const neg = r.status === "danger";
  const lineChip = r.line > 0
    ? `<span class="hchip redline" title="月最低支出即月光红线水位">${I.gauge(13)} 红线 ${fmt(r.line)}</span>`
    : "";
  els.heroWrap.innerHTML = `
    <div class="card hero">
      <div class="hero-label">${I.box(15)} 本月可用现金</div>
      <div class="hero-num num ${neg ? "is-neg" : ""}">${neg ? I.alert(24) : ""}<span>${fmt(r.bal)}</span></div>
      <div class="hero-chips">
        <span class="hchip">${I.up(13)} ${fmt(r.f.income)}</span>
        <span class="hchip">${I.down(13)} 分期 ${fmt(r.f.due)}</span>
        <span class="hchip">${I.card(13)} ×${r.f.actives.length}</span>
        ${lineChip}
      </div>
      <div class="hero-foot">${I.flag(13)} 已预测至 ${fullLabel(furthestKey())}</div>
      <button class="hero-predict" id="heroPredict" type="button">${I.sparkles(14)} 支出试算 · 新增一笔分期会怎样</button>
    </div>`;
  $("heroPredict").addEventListener("click", openPredict);
}

function renderAlert() {
  if (!hasData()) {
    els.alertWrap.innerHTML = "";
    return;
  }
  /* 警示仅限当月：本月月光 → danger；余额不低于最低支出 → 不做任何警示（safe） */
  const r = riskOf(nowKey());
  let html = "";
  if (r.status === "danger") {
    html = `<button class="alert-card danger" data-go="compare">
      <span class="alert-ic">${I.alert(22)}</span>
      <span class="alert-body">
        <b>本月月光</b>
        <p>本月可用现金 ${fmt(r.bal)}${r.line > 0 ? `，跌破最低支出红线 ${fmt(r.line)}，缺口 ${fmt(r.line - r.bal)}` : "，已转负，收入盖不住分期"}。</p>
        <span class="alert-tags"><span>${I.down(11)} ${r.line > 0 ? "可用余额低于最低支出" : "入不敷出"}</span></span>
      </span>
      <span class="alert-arrow">${I.chevR(17)}</span>
    </button>`;
  } else {
    html = `<button class="alert-card safe" data-go="compare">
      <span class="alert-ic">${I.shield(22)}</span>
      <span class="alert-body">
        <b>本月无恙</b>
        <p>本月可用现金 ${fmt(r.bal)}${r.line > 0 ? `，高于最低支出红线，尚余 ${fmt(r.bal - r.line)}` : ""}。未来月份见对比图。</p>
      </span>
      <span class="alert-arrow">${I.chevR(17)}</span>
    </button>`;
  }

  /* 独立行：未来 6 个月前瞻 */
  const fc = forecastSummary();
  if (fc.level === "safe") {
    html += `<button class="alert-card safe forecast" data-go="compare">
      <span class="alert-ic">${I.sparkles(22)}</span>
      <span class="alert-body">
        <b>未来 6 个月 · 全程无恙</b>
        <p>现金月月守在水位之上，宝盒一直有余粮，保持现在的节奏就很好。</p>
      </span>
      <span class="alert-arrow">${I.chevR(17)}</span>
    </button>`;
  } else {
    const crit = fc.level === "critical";
    const recTxt = fc.recoverKey
      ? crit
        ? `预计 ${fullLabel(fc.recoverKey)} 才恢复（${fc.recoverIn} 个月后），战线过长`
        : `预计 ${fullLabel(fc.recoverKey)} 恢复如常`
      : "在可预见的月份内难以恢复";
    html += `<button class="alert-card ${crit ? "critical" : "danger"} forecast" data-go="compare">
      <span class="alert-ic">${I.alert(22)}</span>
      <span class="alert-body">
        <b>未来 6 个月 · ${fc.moonCount} 个月月光</b>
        <p>累计超支 ${fmt(fc.totalGap)}，${recTxt}。</p>
      </span>
      <span class="alert-arrow">${I.chevR(17)}</span>
    </button>`;
  }

  els.alertWrap.innerHTML = html;
  els.alertWrap.querySelectorAll(".alert-card").forEach((card) => card.addEventListener("click", () => switchView("compare")));
}

function renderGuide() {
  els.guideWrap.innerHTML = hasData()
    ? ""
    : `<button class="guide" id="guideBtn"><span class="guide-ic">${I.sparkles(18)}</span>告诉宝盒你的收入与分期，先看红线在哪${I.chevR(15)}</button>`;
  const btn = $("guideBtn");
  if (btn) btn.addEventListener("click", () => switchView("settings"));
}

function renderMonthList() {
  const cur = nowKey();
  const far = furthestKey();
  const defEnd = addMonths(cur, 6);
  const hasMore = diffMonths(defEnd, far) > 0;
  const end = ui.expanded && hasMore ? far : defEnd;
  const n = diffMonths(cur, end);

  let html = "";
  let kk = cur;
  for (let i = 0; i <= n; i++) {
    const r = riskOf(kk);
    const f = r.f;
    const neg = r.status === "danger";
    const badge = neg
      ? '<span class="rbadge moon">月光</span>'
      : i === 0
        ? '<span class="badge-now">本月</span>'
        : "";
    html += `
      <div class="mcard ${neg ? "neg" : ""}">
        <div class="mcard-top">
          <span class="mic">${I.cal(14)}</span>
          <b>${fullLabel(kk)}</b>
          ${badge}
          <span class="bal num ${neg ? "is-neg" : ""}">${neg ? I.alert(14) : ""}${fmt(r.bal)}</span>
        </div>
        <div class="mstats">
          <span class="mstat">${I.up(12)} ${fmt(f.income)}</span>
          ${f.actives.length ? `<span class="mstat due">${I.card(12)} ${fmt(f.due)} ×${f.actives.length}</span>` : ""}
        </div>
      </div>`;
    kk = addMonths(kk, 1);
  }
  els.monthList.innerHTML = html;
  els.overviewHead.innerHTML = `${I.layers(14)} 每月可用现金 · 共 ${n + 1} 个月`;
  els.expandWrap.innerHTML = hasMore
    ? `<button class="btn btn-ghost" id="expandBtn">${ui.expanded ? I.chevU(15) : I.chevD(15)} ${ui.expanded ? "收起" : `展开全部预测 · 至 ${fullLabel(far)}`}</button>`
    : "";
  const btn = $("expandBtn");
  if (btn)
    btn.addEventListener("click", () => {
      ui.expanded = !ui.expanded;
      renderMonthList();
    });
}

/* ================= 查询 ================= */
function renderQuery() {
  const cur = nowKey();
  if (!ui.queryMonth || ui.queryMonth < cur) ui.queryMonth = cur;
  els.queryCard.innerHTML = `
    <div class="card-title">${I.search(15)} 查询某月</div>
    <label class="field">${I.cal(17)}<input type="month" id="qMonth" value="${ui.queryMonth}" min="${cur}" /></label>`;

  const k = ui.queryMonth;
  const r = riskOf(k);
  const f = r.f;
  const neg = r.status === "danger";

  const notes = [];
  if (neg) {
    const msg =
      r.line > 0
        ? `可用现金 ${fmt(r.bal)} 低于最低支出红线 ${fmt(r.line)}，还差 ${fmt(r.line - r.bal)} 才够必要开销。`
        : `该月入不敷出，资金缺口 ${fmt(Math.abs(r.bal))}。`;
    notes.push(`<div class="q-note danger">${I.alert(14)}<span>${msg}</span></div>`);
  }

  /* 距月光红线余量：仅在配置了月最低支出时展示 */
  const lineHint =
    r.line > 0 && !neg
      ? `<div class="q-linehint">${I.gauge(13)}<span>月光红线 ${fmt(r.line)} · 尚余 ${fmt(r.bal - r.line)}</span></div>`
      : "";

  const rows = [
    `<div class="rowline">${I.banknote(16)}<span>月收入</span><span class="amt pos num">+${fmt0(f.income)}</span></div>`,
    ...(f.due > 0
      ? [`<div class="rowline">${I.card(16)}<span>分期还款合计 ×${f.actives.length}</span><span class="amt num">−${fmt0(f.due)}</span></div>`]
      : []),
  ].join("");

  els.queryResult.innerHTML = `
    <div class="card">
      <div class="q-head"><span class="mic">${I.cal(14)}</span><b>${fullLabel(k)}</b>
        ${neg ? '<span class="rbadge moon">月光</span>' : ""}
      </div>
      ${rows}
      <div class="q-bal ${neg ? "is-neg" : ""}">
        <span class="q-bal-label">${I.box(15)} 当月可用现金</span>
        <span class="q-bal-num num">${neg ? I.alert(17) : ""}${fmt(r.bal)}</span>
      </div>
      ${lineHint}
      ${notes.join("")}
    </div>`;

  $("qMonth").addEventListener("change", (e) => {
    if (e.target.value) {
      ui.queryMonth = e.target.value;
      renderQuery();
    }
  });
}

/* ================= 对比（红线图） ================= */
function barChart(data) {
  const n = data.length;
  const bw = 30;
  const gap = 18;
  const W = Math.max(280, n * (bw + gap) + gap);
  const H = 230;
  const padT = 30;
  const padB = 30;
  const vals = data.map((d) => d.v);
  const line = state.minExpense; // 月光红线水位：月最低支出；未配置时为 0
  const vmaxRaw = Math.max(0, ...vals, line);
  const vmin = Math.min(0, ...vals);
  const span = vmaxRaw - vmin || 1;
  const scale = (H - padT - padB) / span;
  const y0 = padT + vmaxRaw * scale; // 数值 0 的基线
  const yLine = y0 - line * scale; // 月光红线下沿

  let bars = "";
  data.forEach((d, i) => {
    const x = gap + i * (bw + gap);
    const h = Math.max(2, Math.abs(d.v) * scale);
    const y = d.v >= 0 ? y0 - h : y0;
    const moon = d.v < line; // 跌破月光红线（含负值柱）
    bars += `<rect class="bar ${moon ? "neg" : ""}" x="${x}" y="${y}" width="${bw}" height="${h}" rx="6" style="animation-delay:${i * 40}ms"/>
      <text class="blabel" x="${x + bw / 2}" y="${d.v >= 0 ? y - 6 : y + h + 12}" text-anchor="middle" fill="${moon ? "#8C1F18" : "#85736A"}">${shortNum(d.v)}</text>
      <text class="mlabel" x="${x + bw / 2}" y="${H - 8}" text-anchor="middle">${shortLabel(d.k)}</text>`;
  });

  /* 月光红线：仅配置月最低支出时画出水位线；未配置时零轴本身即红线 */
  const lineMark =
    line > 0
      ? `<line x1="4" x2="${W - 4}" y1="${yLine}" y2="${yLine}" stroke="#C73E33" stroke-width="1.4"/>
         <text class="linenote" x="${W - 6}" y="${yLine - 5}" text-anchor="end" fill="#8C1F18">月光红线 ${shortNum(line)}</text>
         <line x1="4" x2="${W - 4}" y1="${y0}" y2="${y0}" stroke="#E5D8C8" stroke-width="1"/>`
      : `<line x1="4" x2="${W - 4}" y1="${y0}" y2="${y0}" stroke="#C73E33" stroke-width="1.4"/>
         <text class="linenote" x="${W - 6}" y="${y0 - 5}" text-anchor="end" fill="#8C1F18">月光红线 0</text>`;

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="可用现金红线对比图">
    <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#D8533F"/><stop offset="1" stop-color="#8C1F18"/>
    </linearGradient></defs>
    ${lineMark}
    ${bars}</svg>`;
}

/* 自有记录最早月：所有分期中最早的起始月，无分期则为本月 */
function earliestKey() {
  let e = nowKey();
  state.installments.forEach((it) => {
    if (diffMonths(it.start, e) > 0) e = it.start;
  });
  return e;
}

/* 手动添加单个月份：去重 + 上限 12 */
function addCompareMonths(keys) {
  let added = 0;
  let dup = 0;
  let capped = 0;
  keys.forEach((k) => {
    if (ui.compareSel.includes(k)) {
      dup++;
      return;
    }
    if (ui.compareSel.length >= 12) {
      capped++;
      return;
    }
    ui.compareSel.push(k);
    added++;
  });
  if (added) renderCompare();
  if (capped)
    showAlert({ icon: I.alert(22), tone: "danger", title: "已达上限", msg: "最多同时对比 12 个月，超出的月份未加入。" });
  else if (!added && dup) toast("所选月份已在已选列表中", I.alert(14));
}

/* 快捷批：直接切换为所选集合（替换语义，不做重复提示），超上限取最近 12 个月 */
function setCompareMonths(keys) {
  const uniq = [...new Set(keys)];
  if (uniq.length > 12) {
    ui.compareSel = uniq.slice(-12);
    toast("最多同时对比 12 个月，已取最近 12 个月", I.alert(14));
  } else {
    ui.compareSel = uniq;
  }
  renderCompare();
}

function renderCompare() {
  const cur = nowKey();
  const far = furthestKey();
  const early = earliestKey();
  if (!ui.compareSel) ui.compareSel = [cur, addMonths(cur, 1), addMonths(cur, 2)];
  if (!ui.cmpMonth) ui.cmpMonth = cur;

  /* 已选月份（时间升序，点击移除） */
  const sel = [...ui.compareSel].sort();
  const selChips = sel.length
    ? sel.map((k) => `<button class="chip on sel" data-k="${k}" aria-label="移除${fullLabel(k)}">${shortLabel(k)} ${I.x(11)}</button>`).join("")
    : `<div class="sel-empty">${I.sparkles(14)}<span>尚未选择月份，从下方添加</span></div>`;
  els.comparePick.innerHTML = `
    <div class="card-title">${I.check(15)} 已选月份 <small>${sel.length} / 12</small></div>
    <div class="sel-chips">${selChips}</div>
    ${sel.length ? `<div class="sel-actions"><button class="mini-btn" id="cmpClear">${I.trash(12)} 清空已选</button></div>` : ""}`;

  /* 添加月份：自最早记录月起，至最远分期月 */
  els.compareAdd.innerHTML = `
    <div class="card-title">${I.plus(15)} 添加月份 <small>${fullLabel(early)} 起可选</small></div>
    <div class="add-month-row">
      <label class="field">${I.cal(17)}<input type="month" id="cmpMonth" value="${ui.cmpMonth}" min="${early}" max="${far}"></label>
      <button class="icon-btn add" id="cmpAdd" aria-label="添加所选月份">${I.plus(18)}</button>
    </div>
    <div class="quick-chips">
      <button class="chip" data-q="3">${I.clock(12)} 近 3 个月</button>
      <button class="chip" data-q="6">${I.clock(12)} 近 6 个月</button>
      <button class="chip" data-q="all">${I.layers(12)} 全部月份</button>
    </div>`;

  /* 图表与统计 */
  if (!sel.length) {
    els.compareChart.innerHTML = `<div class="empty">${I.chart(26)}<p>添加月份后在此对比</p></div>`;
    els.compareSummary.innerHTML = "";
  } else {
    const data = sel.map((k) => ({ k, v: balanceAt(k) }));
    els.compareChart.innerHTML = `
      <div class="card-title">${I.chart(15)} 可用现金 vs 红线</div>
      <div class="chart-scroll">${barChart(data)}</div>
      <div class="legend"><span><i class="dot d-red"></i>可用现金</span><span><i class="dot d-ink"></i>月光</span></div>`;

    const max = data.reduce((a, b) => (b.v > a.v ? b : a));
    const min = data.reduce((a, b) => (b.v < a.v ? b : a));
    const avg = data.reduce((s, d) => s + d.v, 0) / data.length;
    els.compareSummary.innerHTML = `
      <div class="sum-cards">
        <div class="sum-card">${I.shield(17)}<small>最充盈</small><b class="num">${shortLabel(max.k)}</b><span class="num">${fmt(max.v)}</span></div>
        <div class="sum-card">${I.alert(17)}<small>最见底</small><b class="num">${shortLabel(min.k)}</b><span class="num ${min.v < state.minExpense ? "is-neg" : ""}">${fmt(min.v)}</span></div>
        <div class="sum-card">${I.coins(17)}<small>均值</small><b class="num">${sel.length}期</b><span class="num">${fmt(avg)}</span></div>
      </div>`;
  }

  /* 事件绑定 */
  els.comparePick.querySelectorAll(".chip.sel").forEach((btn) =>
    btn.addEventListener("click", () => {
      ui.compareSel = ui.compareSel.filter((k) => k !== btn.dataset.k);
      renderCompare();
    })
  );
  const clearBtn = $("cmpClear");
  if (clearBtn)
    clearBtn.addEventListener("click", () => {
      ui.compareSel = [];
      renderCompare();
    });
  $("cmpMonth").addEventListener("change", (e) => {
    if (e.target.value) ui.cmpMonth = e.target.value;
  });
  $("cmpAdd").addEventListener("click", () => {
    const v = $("cmpMonth").value;
    if (!v) {
      toast("请先选择要添加的月份", I.alert(14));
      return;
    }
    ui.cmpMonth = v;
    addCompareMonths([v]);
  });
  els.compareAdd.querySelectorAll(".quick-chips .chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      const q = chip.dataset.q;
      const keys = [];
      if (q === "all") {
        const n = diffMonths(early, far);
        for (let i = 0; i <= n; i++) keys.push(addMonths(early, i));
      } else {
        const n = parseInt(q, 10);
        for (let i = 0; i < n; i++) keys.push(addMonths(cur, i));
      }
      setCompareMonths(keys);
    })
  );
}

/* ================= 设置：筛查与分页 ================= */
const INST_PAGE_SIZE = 5;
const INST_STATUS = [
  { id: "all", label: "全部", icon: I.layers },
  { id: "active", label: "进行中", icon: I.clock },
  { id: "pending", label: "未开始", icon: I.cal },
  { id: "done", label: "已结束", icon: I.check },
];

function instStatusOf(it) {
  const cur = nowKey();
  if (diffMonths(cur, it.start) > 0) return "pending";
  if (diffMonths(cur, addMonths(it.start, it.periods - 1)) < 0) return "done";
  return "active";
}

function filteredInstallments() {
  const q = ui.instFilter.q.trim().toLowerCase();
  return state.installments.filter((it) => {
    if (ui.instFilter.status !== "all" && instStatusOf(it) !== ui.instFilter.status) return false;
    if (q && !(it.name || "").toLowerCase().includes(q)) return false;
    return true;
  });
}

function instItemHtml(it) {
  const rem = remainingPeriods(it);
  const end = addMonths(it.start, it.periods - 1);
  const st = instStatusOf(it);
  const stTag =
    st === "active"
      ? '<i class="st-tag st-active">进行中</i>'
      : st === "pending"
        ? '<i class="st-tag st-pending">未开始</i>'
        : '<i class="st-tag st-done">已结束</i>';
  return `<div class="inst-item">
    <span class="inst-ic">${I.card(17)}</span>
    <div class="inst-meta"><b>${esc(it.name) || "分期还款"}${stTag}</b><small>${fmt(it.monthly)}/期 · 共${it.periods}期 · 剩${rem}期 · 至${fullLabel(end)}</small></div>
    <button class="icon-btn del" data-id="${it.id}" aria-label="删除该分期">${I.trash(14)}</button>
  </div>`;
}

/* 仅重渲染列表与分页条：筛查输入时调用，避免重建搜索框导致失焦 */
function renderInstList() {
  const listEl = $("instList");
  const pagerEl = $("instPager");
  if (!listEl || !pagerEl) return;
  const matched = filteredInstallments();
  const total = matched.length;
  const allCount = state.installments.length;
  const pages = Math.max(1, Math.ceil(total / INST_PAGE_SIZE));
  ui.instFilter.page = Math.min(Math.max(1, ui.instFilter.page), pages);
  const p = ui.instFilter.page;
  const pageItems = matched.slice((p - 1) * INST_PAGE_SIZE, p * INST_PAGE_SIZE);

  const countEl = $("instCount");
  if (countEl) countEl.textContent = allCount;

  listEl.innerHTML = pageItems.length
    ? pageItems.map(instItemHtml).join("")
    : `<div class="empty small">${I.search(20)}<p>${allCount ? "无匹配的分期记录" : "暂无分期项目，从上方添加"}</p></div>`;

  const totalTxt = total === allCount ? `共 ${allCount} 条` : `筛查 ${total} / ${allCount} 条`;
  pagerEl.innerHTML = !total
    ? ""
    : pages > 1
      ? `<button class="icon-btn" id="pgPrev" ${p <= 1 ? "disabled" : ""} aria-label="上一页">${I.chevL(15)}</button>
         <span class="pg-info num">${p} / ${pages}</span>
         <button class="icon-btn" id="pgNext" ${p >= pages ? "disabled" : ""} aria-label="下一页">${I.chevR(15)}</button>
         <span class="pg-total">${totalTxt}</span>`
      : `<span class="pg-total alone">${totalTxt}</span>`;

  listEl.querySelectorAll(".del").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const it = state.installments.find((x) => x.id === btn.dataset.id);
      if (!it) return;
      const ok = await showConfirm({
        icon: I.trash(22),
        tone: "danger",
        title: "删除分期",
        msg: `将删除「${esc(it.name) || "分期还款"}」（${fmt(it.monthly)}/期 · 共${it.periods}期），此操作不可恢复。`,
        okText: "确认删除",
        cancelText: "取消",
      });
      if (!ok) return;
      state.installments = state.installments.filter((x) => x.id !== btn.dataset.id);
      save(true);
      renderInstList();
      toast("已移除该分期", I.trash(13));
    })
  );
  const prev = $("pgPrev");
  const next = $("pgNext");
  if (prev)
    prev.addEventListener("click", () => {
      ui.instFilter.page--;
      renderInstList();
    });
  if (next)
    next.addEventListener("click", () => {
      ui.instFilter.page++;
      renderInstList();
    });
}

/* ================= 设置 ================= */
function renderSettings() {
  els.baseCard.innerHTML = `
    <div class="card-title">${I.coins(15)} 收入</div>
    <div class="fields">
      <label class="field">${I.banknote(17)}<input id="inSalary" type="number" min="0" inputmode="decimal" placeholder="月收入（税后到手）¥" value="${state.salary || ""}"></label>
      <label class="field">${I.receipt(17)}<input id="inMinExpense" type="number" min="0" inputmode="decimal" placeholder="月最低支出 ¥（低于此数即月光）" value="${state.minExpense || ""}"></label>
    </div>`;

  /* 分期：添加表单在上，已配置记录（筛查+分页）在下 */
  els.instCard.innerHTML = `
    <div class="card-title">${I.card(15)} 分期还款 <span class="count" id="instCount">${state.installments.length}</span></div>
    <div class="add-form">
      <label class="field">${I.tag(17)}<input id="adName" type="text" maxlength="12" placeholder="名称 · 如 iPhone 分期"></label>
      <div class="grid2">
        <label class="field">${I.banknote(17)}<input id="adAmt" type="number" min="0" inputmode="decimal" placeholder="每期 ¥"></label>
        <label class="field">${I.clock(17)}<input id="adPeriods" type="number" min="1" max="360" inputmode="numeric" placeholder="期数"></label>
      </div>
      <label class="field">${I.cal(17)}<input id="adStart" type="month" value="${nowKey()}"></label>
      <button class="btn" id="adBtn">${I.plus(17)} 添加分期</button>
    </div>
    <div class="inst-tools">
      <label class="field">${I.search(16)}<input id="fltQ" type="search" placeholder="按名称筛查" value="${esc(ui.instFilter.q)}"></label>
      <div class="filter-chips" id="fltChips">
        ${INST_STATUS.map((s) => `<button class="chip ${ui.instFilter.status === s.id ? "on" : ""}" data-s="${s.id}">${s.icon(12)} ${s.label}</button>`).join("")}
      </div>
    </div>
    <div class="inst-list" id="instList"></div>
    <div class="pager" id="instPager"></div>`;

  els.dangerZone.innerHTML = `<button class="btn btn-danger" id="wipeBtn">${I.trash(14)} 清空数据</button>`;

  /* 基础输入：即时保存，不重渲染本视图以免失焦 */
  $("inSalary").addEventListener("input", (e) => {
    state.salary = clampNum(e.target.value, 0);
    save();
  });
  $("inMinExpense").addEventListener("input", (e) => {
    state.minExpense = clampNum(e.target.value, 0);
    save();
  });

  /* 名称筛查：只刷新列表，不重建输入框 */
  $("fltQ").addEventListener("input", (e) => {
    ui.instFilter.q = e.target.value;
    ui.instFilter.page = 1;
    renderInstList();
  });

  /* 状态筛选 */
  $("fltChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    ui.instFilter.status = chip.dataset.s;
    ui.instFilter.page = 1;
    $("fltChips").querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === chip));
    renderInstList();
  });

  renderInstList();

  $("adBtn").addEventListener("click", () => {
    const name = $("adName").value.trim();
    const monthly = clampNum($("adAmt").value, 0);
    const periods = Math.round(clampNum($("adPeriods").value, 0));
    const start = $("adStart").value;
    if (monthly <= 0 || periods < 1 || !/^\d{4}-\d{2}$/.test(start || "")) {
      toast("请完整填写每期金额与期数", I.alert(14));
      return;
    }
    state.installments.push({
      id: Date.now().toString(36),
      name,
      monthly,
      periods: Math.min(360, periods),
      start,
    });
    save(true);
    renderSettings();
    toast("分期已加入宝盒");
  });

  $("wipeBtn").addEventListener("click", async () => {
    const ok = await showConfirm({
      icon: I.alert(22),
      tone: "danger",
      title: "清空数据",
      msg: "将删除月收入与全部分期记录，此操作不可恢复。",
      okText: "确认清空",
    });
    if (!ok) return;
    state = { ...DEFAULTS, installments: [] };
    ui.instFilter = { q: "", status: "all", page: 1 };
    save(true);
    renderAll();
    toast("宝盒已清空", I.trash(13));
  });
}

/* ================= 总渲染与初始化 ================= */
/* 单视图异常隔离：任一视图渲染出错不阻断其他视图，便于定位且不致白屏 */
function safeRender(name, fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[render] ${name} 渲染失败:`, err);
  }
}

function renderAll() {
  els.todayPill.innerHTML = `${I.cal(13)} ${fullLabel(nowKey())}`;
  renderTabbar();
  safeRender("hero", renderHero);
  safeRender("alert", renderAlert);
  safeRender("guide", renderGuide);
  safeRender("monthList", renderMonthList);
  safeRender("query", renderQuery);
  safeRender("compare", renderCompare);
  safeRender("settings", renderSettings);
}

els.tabbar.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (btn && btn.dataset.view !== ui.view) switchView(btn.dataset.view);
});

renderAll();
