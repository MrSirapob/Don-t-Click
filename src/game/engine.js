export class GameEngine {
  constructor({ rounds, ui, scorePerRound, onEnd }) {
    this.rounds = rounds;
    this.ui = ui;
    this.scorePerRound = scorePerRound;
    this.onEnd = onEnd;
    this.roundIndex = 0;
    this.score = 0;
    this.resolved = false;
    this.cleanup = () => {};
    this.roundToken = 0;
  }

  start() {
    this.roundIndex = 0;
    this.score = 0;
    this.showRound();
  }

  showRound() {
    this.cleanup();
    this.cleanup = () => {};
    this.resolved = false;
    const token = ++this.roundToken;
    const round = this.rounds[this.roundIndex];

    this.ui.round.textContent = `${this.roundIndex + 1} / ${this.rounds.length}`;
    this.ui.score.textContent = this.score;
    this.ui.tag.textContent = round.label;
    this.ui.title.textContent = round.title;
    this.ui.message.textContent = round.message;
    this.ui.status.textContent = "ทำตามกติกา";
    this.ui.arena.innerHTML = "";

    this.current = { round, token };
    return { round, token };
  }

  isCurrent(token) {
    return this.current?.token === token && token === this.roundToken && !this.resolved;
  }

  win(token, bonus = 0) {
    if (!this.isCurrent(token)) return;
    this.resolved = true;
    this.score += this.scorePerRound + bonus;
    this.ui.score.textContent = this.score;
    this.cleanup();
    if (this.roundIndex >= this.rounds.length - 1) {
      this.onEnd(true, this.roundIndex + 1, this.score);
      return;
    }
    this.roundIndex++;
    // เปลี่ยนรอบแทบจะทันที ลดความรู้สึกหน่วงหลังผู้เล่นทำ Win Condition
    requestAnimationFrame(() => this.showRound());
  }

  lose(token, reason = "โดนหลอก") {
    if (!this.isCurrent(token)) return;
    this.resolved = true;
    this.cleanup();
    this.ui.screen.classList.add("shake");
    setTimeout(() => this.ui.screen.classList.remove("shake"), 300);
    this.onEnd(false, this.roundIndex + 1, this.score, reason);
  }

  setCleanup(fn) {
    this.cleanup = fn;
  }
}