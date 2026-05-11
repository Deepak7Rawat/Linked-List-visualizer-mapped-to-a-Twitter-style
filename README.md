# Linked-List-visualizer-mapped-to-a-Twitter-style
TweetList is an innovative Linked List visualization tool that connects DSA ideas to the familiar interface of a social media site like Twitter. It is developed using pure HTML, CSS, and JavaScript, incorporating a cutting-edge glassmorphism design. Witness the real-time animations of singly and doubly linked list operations# ⌬ TweetList 

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
