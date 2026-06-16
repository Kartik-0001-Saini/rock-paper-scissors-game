# 🪨📄✂️ Rock Paper Scissors

A beginner-friendly, single-page Rock Paper Scissors game built with pure HTML, CSS, and JavaScript — no frameworks, no libraries, no build tools.

---

## 📸 Preview

| State | Description |
|-------|-------------|
| 🟣 Default | Question marks shown, waiting for player input |
| 🟢 Win | Green banner, player card glows |
| 🔴 Lose | Red banner, CPU card glows |
| 🟡 Draw | Yellow banner, no card highlighted |

---

## 🚀 Getting Started

No installation required. Just open the file in a browser.

```bash
# 1. Clone or download the project
git clone https://github.com/Kartik-0001-Saini/rock-paper-scissors-game.git

# 2. Open the game
cd rock-paper-scissors
open index.html       # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

> Or simply double-click `index.html` in your file explorer.

---

## 🗂️ Project Structure

```
rock-paper-scissors/
├── index.html    ← Page structure and semantic markup
├── style.css     ← All styling, layout, and animations
└── script.js     ← Game logic and DOM interactions
```

Each file has **one job** — this separation of concerns is a core clean-code principle.

---

## 🎮 How to Play

1. Click **Rock**, **Paper**, or **Scissors**
2. The CPU instantly picks a random move
3. The result is shown — Win 🎉, Lose 💀, or Draw 🤝
4. Scores update automatically
5. Click **↺ Reset Score** to start fresh

---

## ✨ Features

- ✅ Random CPU move each round
- ✅ Live scoreboard (You vs CPU)
- ✅ Color-coded result banner (green / red / yellow)
- ✅ Emoji display for both choices
- ✅ Winning card gets a glow highlight
- ✅ Reset button clears all scores
- ✅ Hover animations and smooth transitions
- ✅ Fully responsive — works on mobile and desktop
- ✅ Accessible — keyboard navigable, screen-reader friendly (`aria-live`, `aria-label`)
- ✅ Respects `prefers-reduced-motion` for users sensitive to animation

---

## 🧠 How It Works

### Game Logic (script.js)

```
Player clicks a button
       ↓
JS reads data-move attribute ("Rock" / "Paper" / "Scissors")
       ↓
CPU picks a random move via Math.random()
       ↓
determineResult() compares moves using a lookup table
       ↓
updateScores() increments the right score
       ↓
updateDisplay() updates emojis, banner, and card highlights
```

### Win Conditions

```js
const winConditions = {
  Rock:     "Scissors",   // Rock crushes Scissors
  Paper:    "Rock",       // Paper covers Rock
  Scissors: "Paper",      // Scissors cut Paper
};
```

### Result States

| Result | Banner Color | Card Highlight |
|--------|-------------|----------------|
| Win    | 🟢 Green    | Player card    |
| Lose   | 🔴 Red      | CPU card       |
| Draw   | 🟡 Yellow   | Neither        |

---

## 🎨 Design Decisions

| Choice | Reason |
|--------|--------|
| Dark background (`#0d0d12`) | Reduces eye strain; gives an "arena" feel |
| Electric indigo accent (`#7c5cfc`) | Distinctive; avoids generic blue/teal defaults |
| CSS variables for all colors | One change updates the whole theme |
| Spring easing on hover | Makes interactions feel tactile and alive |
| `data-move` attributes on buttons | Keeps JS generic — one handler for all three buttons |
| State object for scores | All mutable data in one place; easy to reset |

---

## 📖 Key Concepts for Beginners

| Concept | Where it's used |
|---------|----------------|
| `Math.random()` | Picking the CPU's move |
| `data-*` attributes | Passing move names from HTML to JS |
| `addEventListener` | Reacting to button clicks |
| `classList.add/remove` | Swapping CSS styles from JavaScript |
| CSS custom properties | Reusable design tokens (colors, spacing) |
| `aria-live` | Announcing results to screen readers |
| Separation of concerns | HTML / CSS / JS each handle one layer |

---

## 🌐 Browser Support

Works in all modern browsers — no polyfills needed.

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |

---

## 📝 Git Commit History (Suggested)

```
feat: scaffold semantic HTML structure and link CSS/JS files
feat: add core game logic — getComputerChoice and determineResult
feat: wire up move buttons with event listeners and playRound function
feat: implement scoreboard update and score bump animation
feat: add result banner with win/lose/draw color states
feat: implement reset button to clear scores and UI
style: build dark arena design system with CSS custom properties
style: add hover transitions and spring easing on move buttons
style: make layout responsive with clamp() and mobile media queries
chore: add comments throughout HTML, CSS, and JS for readability
docs: add README with setup, features, and concept explanations
```

---

## 🔧 Possible Improvements

- [ ] Add a "Best of 5" game mode
- [ ] Play sound effects on win/lose/draw
- [ ] Save high score to `localStorage`
- [ ] Add keyboard shortcuts (R / P / S)
- [ ] Animate the CPU "thinking" before revealing its choice
- [ ] Add a game history log showing past rounds

---

## 📄 License

This project is open source and free to use for learning purposes.

---
