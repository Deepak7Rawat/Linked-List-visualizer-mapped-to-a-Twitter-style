![Uploading LINKLIST_UI.png…]()

## TweetList — Standalone HTML/CSS/JS

## 👨‍💻 Author

## Deepak Rawat

🎓 BCA 2nd Semester Student  
💻 Passionate About Programming & Development

---

### ⭐ If you like this project, give it a star on GitHub ⭐


> **A modern, interactive Linked List visualizer mapped to a Twitter-style feed.**

TweetList bridges the gap between core Data Structures and Algorithms (DSA) and modern web design. It reimagines the classic Linked List data structure as a social media feed, allowing you to visualize node operations in real-time through a sleek, futuristic glassmorphism interface.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Overview

Built entirely with Vanilla HTML, CSS, and JavaScript, TweetList visually demonstrates how nodes are connected and manipulated in memory. Every UI interaction maps directly to underlying algorithmic logic, making it a perfect tool for both learning and showcasing foundational computer science concepts.

## ✨ Features

* **🧠 Dual Architecture:** Switch seamlessly between **Singly** and **Doubly** Linked List modes.
* **➕ Dynamic Insertion:** Add new "tweets" (nodes) at the Head, Tail, or any specific index position.
* **🗑️ Precision Deletion:** Remove nodes from the Head, Tail, or by specific position, with pointers automatically rewiring themselves.
* **🔍 Search:** Find nodes by username or specific Tweet ID with instant visual highlighting.
* **🔁 Traversal Viewing:** Traverse the list forward (Singly/Doubly) or backward (Doubly mode only).
* **📱 Live Feed Sync:** Watch the abstract linked list update a realistic, Twitter-style timeline in real-time.
* **🎨 Glassmorphism UI:** A soft dark, futuristic theme with animated backgrounds, floating nodes, and responsive design.

## ⚙️ How It Works

TweetList is designed to demystify how data is stored and manipulated in memory by visualizing a Linked List in real-time. Here is a step-by-step breakdown of the core mechanics:

### 1. The Core Engine (`TweetLinkedList` Class)
At the heart of the application is a custom JavaScript class that handles all the data logic. 
* **Node Generation:** When you input a username and a tweet, the engine creates a new "node" object containing a sequential ID (e.g., `TWEET1001`), the user data, and the text payload.
* **Algorithmic Operations:** Functions like `insertAtPosition()`, `deleteFromBeginning()`, and `search()` manipulate the sequence of these nodes. The logic mimics how memory pointers (`next` and `prev`) are re-assigned in a low-level language like C/C++.

### 2. The Visualizer (`renderVisualizer`)
The visualizer acts as the bridge between the abstract data structure and the UI. 
* **State Snapshots:** Every time an operation occurs, the visualizer takes a snapshot of the current list.
* **Dynamic Rendering:** It maps the nodes to DOM elements, automatically generating the `HEAD` tag, the individual node cards, the directional pointers (`→` for Singly, `⇄` for Doubly), and the final `NULL` terminator.
* **Traversal Logic:** If the user toggles "backward traversal" in Doubly mode, the visualizer reverses the rendering order, starting from the `TAIL` and moving backward to the `HEAD`.

### 3. Timeline Synchronization (`renderFeed`)
To show practical application, TweetList renders the exact same data structure in two different ways. While the visualizer shows the technical structure, the feed engine maps the node data into standard social media cards. Whenever a node is inserted or deleted, both the visual chain and the Twitter-style feed update simultaneously.

### 4. Event Delegation & Animations
* **Optimized Listening:** Instead of attaching event listeners to every individual button, the app uses global event delegation on the document body, parsing `data-act` attributes to trigger the correct linked list methods.
* **Visual Feedback:** When a node is created or found via the search function, its unique ID is temporarily stored in a `highlightIds` Set. The UI applies a glowing CSS animation to that specific node, helping track exactly where the memory operation took place.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Design System:** Custom Glassmorphism UI, CSS Variables, CSS Grid/Flexbox
* **Logic:** Custom `TweetLinkedList` class handling all state and pointer management entirely on the client side.

## 📂 Project Structure

```text
📦 TweetList
 ┣ 📜 index.html    # Core markup and UI layout
 ┣ 📜 styles.css    # Animations, themes, and glassmorphism styling
 ┗ 📜 script.js     # Linked List logic, state management, and DOM rendering

