/* ============================================================
   TweetList — JavaScript
   - TweetLinkedList class (singly + doubly modes)
   - UI wiring: visualizer, operations panel, feed, tabs
   ============================================================ */

// 🔗 Replace with your repo URL
const githubRepo = "https://github.com/your-username/your-repo";

// ----------------------------------------------------------------
// Linked List logic (UI-agnostic — easy to swap with your own code)
// ----------------------------------------------------------------
class TweetLinkedList {
  constructor() {
    this.nodes = [];
    this.counter = 1001;
  }
  _nextId() { return `TWEET${this.counter++}`; }

  insertAtBeginning(username, tweet) {
    const node = { id: this._nextId(), username, tweet };
    this.nodes.unshift(node);
    return node;
  }
  insertAtEnd(username, tweet) {
    const node = { id: this._nextId(), username, tweet };
    this.nodes.push(node);
    return node;
  }
  insertAtPosition(position, username, tweet) {
    const node = { id: this._nextId(), username, tweet };
    const pos = Math.max(0, Math.min(position, this.nodes.length));
    this.nodes.splice(pos, 0, node);
    return node;
  }
  deleteFromBeginning() { return this.nodes.shift() ?? null; }
  deleteFromEnd()       { return this.nodes.pop()   ?? null; }
  deleteAtPosition(position) {
    if (position < 1 || position > this.nodes.length) return null;
    return this.nodes.splice(position - 1, 1)[0] ?? null;
  }
  search(query) {
    const q = (query || "").trim().toLowerCase();
    if (!q) return [];
    return this.nodes.filter(n =>
      n.username.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)
    );
  }
  count()    { return this.nodes.length; }
  snapshot() { return [...this.nodes]; }
}

// ----------------------------------------------------------------
// State
// ----------------------------------------------------------------
const list = new TweetLinkedList();
let mode = "singly";        // "singly" | "doubly"
let reverse = false;        // doubly: forward / backward traversal
let highlightIds = new Set();

// ----------------------------------------------------------------
// DOM helpers
// ----------------------------------------------------------------
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function toast(message, type = "success") {
  const el = $("#toast");
  el.textContent = message;
  el.className = `toast show ${type}`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

// ----------------------------------------------------------------
// Render: Visualizer
// ----------------------------------------------------------------
function renderVisualizer() {
  const canvas = $("#visCanvas");
  const data = list.snapshot();
  const isDoubly = mode === "doubly";

  $("#nodeCount").textContent = data.length;
  $("#capCount").textContent  = data.length;
  $("#capMode").textContent   = mode;
  $("#capDir").textContent    = isDoubly && reverse ? " · viewing tail → head" : "";

  if (data.length === 0) {
    canvas.innerHTML = `
      <div class="vis-empty">
        <div class="ico">⌬</div>
        <p><span class="muted">$</span> head <span class="cyan">→</span> <span class="red">NULL</span></p>
        <p class="small">// list is empty — push a node to begin</p>
      </div>`;
    return;
  }

  const ordered = reverse ? [...data].reverse() : data;
  const arrow = isDoubly ? "⇄" : "→";

  let html = `<div class="vis-row">`;

  // HEAD label
  html += `
    <div class="head-tag">
      <span class="lbl">${isDoubly ? "null ⇄" : "entry"}</span>
      <span class="val">${reverse ? "TAIL" : "HEAD"} ${arrow}</span>
    </div>`;

  // Nodes
  ordered.forEach((node, i) => {
    const realIndex = reverse ? data.length - 1 - i : i;
    const isHead = realIndex === 0;
    const isTail = realIndex === data.length - 1;
    const hl     = highlightIds.has(node.id) ? "highlight" : "";
    const initial = node.username.charAt(0).toUpperCase();

    let tag = "";
    if (isHead) tag = `<span class="node-tag tag-head">HEAD</span>`;
    else if (isTail) tag = `<span class="node-tag tag-tail">TAIL</span>`;

    const ptrLeft  = isDoubly ? `<span class="prev dbl">← prev</span>` : `<span>data</span>`;
    const ptrRight = isDoubly ? `<span class="next dbl">next →</span>` : `<span class="next">→ next</span>`;

    html += `
      <div class="node-wrap">
        <div class="node ${hl}">
          <div class="node-bar">
            <div class="dots"><span></span><span></span><span></span></div>
            <span class="node-pos">node[${realIndex}]</span>
          </div>
          <div class="node-body">
            ${tag}
            <div class="user-row">
              <div class="avatar">${initial}</div>
              <div class="user-info">
                <div class="name">@${escapeHtml(node.username)}</div>
                <div class="id">#${node.id}</div>
              </div>
            </div>
            <div class="tweet-box">${escapeHtml(node.tweet)}</div>
            <div class="ptr-row">${ptrLeft}${ptrRight}</div>
          </div>
        </div>
        <span class="chev">${isDoubly ? "⇄" : "›"}</span>
      </div>`;
  });

  // NULL end
  html += `
    <div class="null-end">
      <span class="lbl">${isDoubly ? "⇄ null" : "end"}</span>
      <span class="val">NULL</span>
    </div>`;

  html += `</div>`;

  if (isDoubly) {
    html += `<p class="caption" style="margin-top:12px">// doubly linked — each node holds <span class="cyan">prev</span> &amp; <span class="cyan">next</span> pointers</p>`;
  }

  canvas.innerHTML = html;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

// ----------------------------------------------------------------
// Render: Feed
// ----------------------------------------------------------------
function renderFeed() {
  const feed = $("#feedList");
  const data = list.snapshot();
  if (data.length === 0) {
    feed.innerHTML = `<div class="feed-empty">// no tweets yet — insert a node above to populate the feed</div>`;
    return;
  }
  feed.innerHTML = data.map(n => `
    <article class="feed-card">
      <div class="top">
        <div class="av">${n.username.charAt(0).toUpperCase()}</div>
        <div class="meta">
          <div class="h">@${escapeHtml(n.username)}</div>
          <div class="id">#${n.id}</div>
        </div>
      </div>
      <p class="body">${escapeHtml(n.tweet)}</p>
    </article>
  `).join("");
}

function renderAll() { renderVisualizer(); renderFeed(); }

function flash(ids) {
  highlightIds = new Set(ids);
  renderVisualizer();
  setTimeout(() => { highlightIds = new Set(); renderVisualizer(); }, 1500);
}

// ----------------------------------------------------------------
// Operations wiring
// ----------------------------------------------------------------
function getInsertInputs() {
  const username = $("#insUser").value.trim();
  const tweet    = $("#insTweet").value.trim();
  if (!username || !tweet) { toast("Username & tweet required", "error"); return null; }
  return { username, tweet };
}

document.addEventListener("click", e => {
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (!act) return;

  if (act === "ins-begin") {
    const v = getInsertInputs(); if (!v) return;
    const n = list.insertAtBeginning(v.username, v.tweet);
    renderAll(); flash([n.id]); toast(`Inserted ${n.id} at head`);
  }
  else if (act === "ins-end") {
    const v = getInsertInputs(); if (!v) return;
    const n = list.insertAtEnd(v.username, v.tweet);
    renderAll(); flash([n.id]); toast(`Inserted ${n.id} at tail`);
  }
  else if (act === "ins-pos") {
    const v = getInsertInputs(); if (!v) return;
    const pos = parseInt($("#insPos").value, 10);
    if (isNaN(pos) || pos < 1) { toast("Enter a valid position (≥ 1)", "error"); return; }
    const n = list.insertAtPosition(pos - 1, v.username, v.tweet);
    renderAll(); flash([n.id]); toast(`Inserted ${n.id} at position ${pos}`);
  }
  else if (act === "del-begin") {
    const n = list.deleteFromBeginning();
    renderAll(); n ? toast(`Deleted ${n.id}`) : toast("List is empty", "error");
  }
  else if (act === "del-end") {
    const n = list.deleteFromEnd();
    renderAll(); n ? toast(`Deleted ${n.id}`) : toast("List is empty", "error");
  }
  else if (act === "del-pos") {
    const pos = parseInt($("#delPos").value, 10);
    if (isNaN(pos) || pos < 1) { toast("Enter a valid position (≥ 1)", "error"); return; }
    const n = list.deleteAtPosition(pos);
    renderAll(); n ? toast(`Deleted ${n.id}`) : toast("Nothing to delete at that position", "error");
  }
  else if (act === "search") {
    const q = $("#searchQ").value;
    const results = list.search(q);
    const out = $("#searchResults");
    if (results.length === 0) {
      out.innerHTML = `<div class="search-result">// no matches found</div>`;
    } else {
      out.innerHTML = results.map(r => `<div class="search-result"><strong>#${r.id}</strong> · @${escapeHtml(r.username)}</div>`).join("");
      flash(results.map(r => r.id));
      toast(`Found ${results.length} match${results.length === 1 ? "" : "es"}`);
    }
  }
});

// ----------------------------------------------------------------
// Tabs
// ----------------------------------------------------------------
$$(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    $$(".tab-panel").forEach(p => p.classList.remove("active"));
    $(`.tab-panel[data-panel="${tab.dataset.tab}"]`).classList.add("active");
  });
});

// ----------------------------------------------------------------
// Mode toggle (singly / doubly)
// ----------------------------------------------------------------
$$(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.mode;
    if (next === mode) return;
    mode = next;
    reverse = false;
    // reset list when switching structures
    list.nodes = []; list.counter = 1001;
    $$(".mode-btn").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
    $("#traversalBtn").classList.toggle("hidden", mode !== "doubly");
    $("#traversalBtn").textContent = "⇄ forward traversal";
    $("#modeHint").textContent = mode === "singly" ? "// each node → next" : "// each node ⇄ prev & next";
    renderAll();
    toast(`Switched to ${mode === "singly" ? "Singly" : "Doubly"} Linked List`);
  });
});

$("#traversalBtn").addEventListener("click", () => {
  reverse = !reverse;
  $("#traversalBtn").textContent = reverse ? "⇄ backward traversal" : "⇄ forward traversal";
  renderVisualizer();
});

// ----------------------------------------------------------------
// GitHub buttons
// ----------------------------------------------------------------
$$("[data-github]").forEach(el => {
  el.setAttribute("href", githubRepo);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener noreferrer");
});

// ----------------------------------------------------------------
// Init
// ----------------------------------------------------------------
$("#year").textContent = new Date().getFullYear();
renderAll();
