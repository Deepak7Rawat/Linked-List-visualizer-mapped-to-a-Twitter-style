# TweetList — Standalone HTML/CSS/JS

A futuristic, glassmorphism-styled linked list visualizer built with **plain HTML, CSS and JavaScript**. No build step. No dependencies. Just open `index.html`.

## ✨ Features
- 🧠 **Two modes** — Singly & Doubly linked list (toggle live)
- ➕ **Insert** at head / tail / position
- 🗑️ **Delete** at head / tail / position
- 🔍 **Search** by username or tweet ID
- 🔁 **Traversal** — forward/backward in doubly mode
- 🐦 **Live tweet feed** synced with the list
- 🎨 Soft-dark glass UI with animated blobs, neon gradients, hover glows

## 🚀 Run
```bash
# just open
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```
Or serve with any static server:
```bash
python3 -m http.server 8080
```

## 📁 Structure
```
.
├── index.html   # markup + sections (hero, about, features, visualizer, feed, tech)
├── styles.css   # design tokens, glass effects, animations
└── script.js    # TweetLinkedList class + UI wiring
```

## 🔗 GitHub link
Edit a single line in `script.js`:
```js
const githubRepo = "https://github.com/your-username/your-repo";
```
All `[data-github]` buttons (navbar, hero, footer) update automatically.

## 🔌 Connect your own backend
The `TweetLinkedList` class in `script.js` is fully UI-agnostic. Replace the implementation (or proxy calls to your backend) — the UI requires only:
- `insertAtBeginning(username, tweet) → node`
- `insertAtEnd(username, tweet) → node`
- `insertAtPosition(0-based, username, tweet) → node`
- `deleteFromBeginning() → node | null`
- `deleteFromEnd() → node | null`
- `deleteAtPosition(1-based) → node | null`
- `search(query) → node[]`
- `snapshot() → node[]`

Each node = `{ id: string, username: string, tweet: string }`.
