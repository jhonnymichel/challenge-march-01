import Ticker from './core/Ticker.js';

export default class Stopwatch extends Ticker {
  constructor(cycleCallback) {
    super();
    this.cycleCallback = cycleCallback;
    this.onTickCompleted = this.onTickCompleted.bind(this);
    this.isPaused = false;
    this.isRunning = false;
  }

  run() {
    this.isRunning = true;
    this.initialTime = Date.now();
    this.cycle();
  }

  togglePause() {
    if (!this.isRunning) {
      return console.error('can\'t togglePause a stopwatch there\'s not running');
    }
    return this.isPaused ? this.resume() : this.pause();
  }

  resume() {
    if (!this.isRunning) {
      return console.error('can\'t togglePause a stopwatch there\'s not running');
    }
    if (!this.isPaused) {
      return console.error('can\'t resume a unpaused run');
    }
    this.isPaused = false;
    this.initialTime += Date.now() - this.pausedAt;
    this.cycle();
  }

  reset() {
    this.isRunning = false;
    this.stop();
    if (this.cycleCallback) {
      this.cycleCallback(0);
    }
  }

  pause() {
    if (!this.isRunning) {
      return console.error('can\'t togglePause a stopwatch there\'s not running');
    }
    if (this.isPaused) {
      return console.error('can\'t pause a paused run');
    }
    this.stop();
    this.isPaused = true;
    this.pausedAt = Date.now();
    if (this.cycleCallback) {
      this.cycleCallback(this.formatStopwatchString(Date.now()));
    }
  }

  cycle() {
    this.start(1, 25, this.onTickCompleted);
  }

  onTickCompleted() {
    if (this.cycleCallback) {
      this.cycleCallback(this.formatStopwatchString(Date.now()));
    }
    this.cycle();
  }

  formatStopwatchString(currentTime) {
    const pastTime = currentTime - this.initialTime;
    const pastSeconds = pastTime / 1000;
    return pastSeconds;
  }
}
