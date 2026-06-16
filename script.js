// =============================================
//  ROCK PAPER SCISSORS — script.js
//  Pure vanilla JS — no libraries or frameworks
// =============================================

// ── 1. CONSTANTS ──────────────────────────────

// All three valid moves the game knows about
const MOVES = ["Rock", "Paper", "Scissors"];

// Emoji map so we can display the right icon per move
const EMOJI = {
  Rock:     "🪨",
  Paper:    "📄",
  Scissors: "✂️",
};

// ── 2. DOM REFERENCES ─────────────────────────
// Grab every element we'll need to read or update.
// Doing this once at the top is faster than querying
// the DOM repeatedly inside functions.

const playerScoreEl  = document.getElementById("player-score");
const cpuScoreEl     = document.getElementById("cpu-score");
const playerEmojiEl  = document.getElementById("player-emoji");
const cpuEmojiEl     = document.getElementById("cpu-emoji");
const playerCardEl   = document.getElementById("player-choice-card");
const cpuCardEl      = document.getElementById("cpu-choice-card");
const resultBannerEl = document.getElementById("result-banner");
const resultTextEl   = document.getElementById("result-text");
const resetBtn       = document.getElementById("reset-btn");

// Select all three move buttons at once
const moveBtns = document.querySelectorAll(".move-btn");

// ── 3. GAME STATE ─────────────────────────────
// A single object holds all mutable state.
// Keeping state in one place makes it easy to reset.

let score = {
  player: 0,
  cpu: 0,
};

// ── 4. CORE GAME LOGIC ────────────────────────

/**
 * getComputerChoice
 * Returns a random move string: "Rock", "Paper", or "Scissors".
 */
function getComputerChoice() {
  // Math.random() gives 0–0.999…, multiply by 3 and floor → 0, 1, or 2
  const randomIndex = Math.floor(Math.random() * MOVES.length);
  return MOVES[randomIndex];
}

/**
 * determineResult
 * Compares two moves and returns "win", "lose", or "draw"
 * from the PLAYER's perspective.
 *
 * @param {string} playerMove  - e.g. "Rock"
 * @param {string} cpuMove     - e.g. "Scissors"
 * @returns {"win"|"lose"|"draw"}
 */
function determineResult(playerMove, cpuMove) {
  if (playerMove === cpuMove) return "draw";

  // All winning combinations for the player
  const winConditions = {
    Rock:     "Scissors",  // Rock crushes Scissors
    Paper:    "Rock",      // Paper covers Rock
    Scissors: "Paper",     // Scissors cut Paper
  };

  return winConditions[playerMove] === cpuMove ? "win" : "lose";
}

// ── 5. UI UPDATE HELPERS ──────────────────────

/**
 * animatePop
 * Briefly adds a CSS class to trigger a pop/bounce animation,
 * then removes it so the animation can re-trigger next round.
 *
 * @param {HTMLElement} el   - element to animate
 * @param {string}      cls  - CSS class to briefly apply
 */
function animatePop(el, cls) {
  el.classList.remove(cls);           // Remove first (in case it's already there)
  void el.offsetWidth;                // Force browser reflow — resets the animation
  el.classList.add(cls);
}

/**
 * bumpScore
 * Triggers the score bump animation on a score element.
 *
 * @param {HTMLElement} el - the score <span> element
 */
function bumpScore(el) {
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");

  // Remove the class after the CSS transition finishes (200ms)
  setTimeout(() => el.classList.remove("bump"), 200);
}

/**
 * updateDisplay
 * Applies all visual changes for a completed round:
 * emojis, result banner text + color, card highlights, scores.
 *
 * @param {string} playerMove  - "Rock" | "Paper" | "Scissors"
 * @param {string} cpuMove     - "Rock" | "Paper" | "Scissors"
 * @param {string} result      - "win" | "lose" | "draw"
 */
function updateDisplay(playerMove, cpuMove, result) {
  // Update emojis
  playerEmojiEl.textContent = EMOJI[playerMove];
  cpuEmojiEl.textContent    = EMOJI[cpuMove];

  // Trigger pop animations on both emojis
  animatePop(playerEmojiEl, "pop");
  animatePop(cpuEmojiEl, "pop");

  // Remove previous result classes from cards and banner
  playerCardEl.classList.remove("highlight");
  cpuCardEl.classList.remove("highlight");
  resultBannerEl.classList.remove("win", "lose", "draw");

  // Apply new result class and message
  const messages = {
    win:  `🎉 You win! ${playerMove} beats ${cpuMove}.`,
    lose: `💀 You lose. ${cpuMove} beats ${playerMove}.`,
    draw: `🤝 It's a draw! Both picked ${playerMove}.`,
  };

  resultTextEl.textContent = messages[result];
  resultBannerEl.classList.add(result);

  // Highlight the winning card
  if (result === "win")  playerCardEl.classList.add("highlight");
  if (result === "lose") cpuCardEl.classList.add("highlight");
}

/**
 * updateScores
 * Increments the appropriate score and refreshes the scoreboard UI.
 *
 * @param {string} result - "win" | "lose" | "draw"
 */
function updateScores(result) {
  if (result === "win") {
    score.player++;
    playerScoreEl.textContent = score.player;
    bumpScore(playerScoreEl);
  } else if (result === "lose") {
    score.cpu++;
    cpuScoreEl.textContent = score.cpu;
    bumpScore(cpuScoreEl);
  }
  // Draw: no score changes
}

// ── 6. MAIN PLAY FUNCTION ─────────────────────

/**
 * playRound
 * Orchestrates one round of the game:
 *   1. Get the CPU's choice
 *   2. Determine who won
 *   3. Update scores
 *   4. Refresh the display
 *
 * @param {string} playerMove - the move the player clicked
 */
function playRound(playerMove) {
  const cpuMove = getComputerChoice();
  const result  = determineResult(playerMove, cpuMove);

  updateScores(result);
  updateDisplay(playerMove, cpuMove, result);
}

// ── 7. RESET FUNCTION ─────────────────────────

/**
 * resetGame
 * Resets scores and the display back to the starting state.
 */
function resetGame() {
  // Clear state
  score.player = 0;
  score.cpu    = 0;

  // Reset scoreboard
  playerScoreEl.textContent = 0;
  cpuScoreEl.textContent    = 0;

  // Reset emojis to question marks
  playerEmojiEl.textContent = "❓";
  cpuEmojiEl.textContent    = "❓";

  // Remove result styling
  playerCardEl.classList.remove("highlight");
  cpuCardEl.classList.remove("highlight");
  resultBannerEl.classList.remove("win", "lose", "draw");

  // Reset result message
  resultTextEl.textContent = "Choose your move to start!";
}

// ── 8. EVENT LISTENERS ────────────────────────

// Attach a click handler to EACH move button.
// We read the button's data-move attribute to know which move was clicked.
moveBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const playerMove = btn.getAttribute("data-move"); // "Rock", "Paper", or "Scissors"
    playRound(playerMove);
  });
});

// Reset button clears scores and UI
resetBtn.addEventListener("click", resetGame);