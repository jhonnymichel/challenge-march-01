import Ticker from './core/Ticker.js';

export default class Stopwatch extends Ticker {
  constructor(cycleCallback) {
    super();
    this.cycleCallback = cycleCallback;
    this.onTickCompleted = this.onTickCompleted.bind(this);
  }

  count() {
    this.initialTime = Date.now();
    this.cycle();
  }

  cycle() {
    this.start(1, 25, this.onTickCompleted);
  }

  onTickCompleted() {
    if (this.cycleCallback) {
      this.cycleCallback(this.formatStopwatchString());
    }
    this.cycle();
  }

  formatStopwatchString() {
    const pastTime = Date.now() - this.initialTime;
    const pastSeconds = pastTime / 1000;
    return pastSeconds;
  }
}
