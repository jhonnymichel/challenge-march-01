import Ticker from './core/Ticker.js';

export default class Clock extends Ticker {
  constructor() {
    super();
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
    console.log(this.date);
    this.runFirstSecond();
  }

  runFirstSecond() {
    const milisecondsRestingToNextSecond = 1000 - this.date.getMilliseconds();
    this.start(1, milisecondsRestingToNextSecond, this.onFirstTick);
  }

  onFirstTick() {
    const secondsRestingToNextMinute = 59 - this.date.getSeconds();
    this.start(secondsRestingToNextMinute, 1000, this.setupNextMinute);
  }

  setupNextMinute() {
    this.date = new Date();
    console.log(this.date);
    this.start(60, 1000, this.setupNextMinute);
  }

  onVisibilityChange(e) {
    if (e.target.visibilityState === 'visible') {
      this.catchUp();
    }
  }
}
