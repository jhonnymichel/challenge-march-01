/**
 * The Ticker Class is the core of all counters.
 * it ticks every interval of miliseconds with precision
 * */
export default class Ticker {
  /**
   * create a new Ticker instance.
   * @param {Object} config - the config containing tickInterval {number} and callback {function}
   */
  constructor(config = { tickInterval: 1000 }) {
    this.tickInterval = config.tickInterval || 1000;
    this.callback = config.callback;
    this.isCounting = false;
    this.delta = 0;
    this.currentTick = 0;
    this.lastTickTimeStamp = 0;
    this.tick = this.tick.bind(this);
  }

  /**
   * start ticking.
   * @param {number} amount - the amount of times it should tick. It defaults to 0. meaning it'll never stop ticking.
   */
  start(amount = 0) {
    this.lastTickTimeStamp = Date.now() - this.tickInterval;
    this.lastDelay = 0;
    this.delta = 0;
    this.currentTick = 0;
    this.tick(amount);
  }

  tick(amount = 0) {
    if (this.isCounting) {
      console.error('ticking is already in progress');
      return;
    }
    this.isCounting = true;
    setTimeout( _ => {
      this.isCounting = false;
      this.currentTick++;
      if (this.callback) {
        this.callback();
      }
      if (amount && this.currentTick >= amount) {
        return;
      }
      return this.tick(amount);
    }, this.tickInterval + this.getDelay());
    this.lastTickTimeStamp = Date.now();
  }

  getDelay() {
    const now = Date.now();
    const delta = now - this.lastTickTimeStamp;
    const delay = this.tickInterval + this.lastDelay - delta;
    this.lastDelay = this.tickInterval - delta;
    return delay;
  }
}
