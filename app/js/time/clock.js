import Ticker from './core/Ticker.js';

export default class Clock extends Ticker {
  constructor(cycleCallback) {
    super();
    this.cycleCallback = cycleCallback;
    this.onFirstTick = this.onFirstTick.bind(this);
    this.setupNextMinute = this.setupNextMinute.bind(this);
    document.addEventListener('visibilitychange',
      this.onVisibilityChange.bind(this));
    this.catchUp();
  }

  catchUp() {
    if (this.isCounting) {
      this.stop();
    }
    this.date = new Date();
    this.runFirstSecond();
    if (this.cycleCallback) {
      this.cycleCallback(this.date);
    }
  }

  runFirstSecond() {
    const milisecondsRestingToNextSecond = 1000 - this.date.getMilliseconds();
    this.start(1, milisecondsRestingToNextSecond, this.onFirstTick);
  }

  onFirstTick() {
    if (this.date.getSeconds() === 0) {
      return this.setupNextMinute();
    }
    const secondsRestingToNextMinute = 59 - this.date.getSeconds();
    this.start(secondsRestingToNextMinute, 1000, this.setupNextMinute);
  }

  setupNextMinute() {
    this.date = new Date();
    this.start(60, 1000, this.setupNextMinute);
    if (this.cycleCallback) {
      this.cycleCallback(this.date);
    }
  }

  onVisibilityChange(e) {
    if (e.target.visibilityState === 'visible') {
      this.catchUp();
    }
  }
}
