export default class Ticker {
  constructor() {
    this.tick = this.tick.bind(this);
  }

  start(amount = 0, tickInterval, callback) {
    this.tickInterval = tickInterval;
    this.lastTickTimeStamp = Date.now() - this.tickInterval;
    this.callback = callback;
    this.isCounting = false;
    this.lastDelay = 0;
    this.delta = 0;
    this.currentTick = 0;
    this.tick(amount);
  }

  stop() {
    clearTimeout(this.timeout);
    this.isCounting = false;
  }

  tick(amount = 0) {
    if (this.isCounting) {
      console.error('ticking is already in progress');
      return;
    }
    this.isCounting = true;
    this.timeout = setTimeout( _ => {
      this.isCounting = false;
      this.currentTick++;
      if (amount && this.currentTick >= amount) {
        if (this.callback) {
          this.callback();
        }
        return;
      }
      this.tick(amount);
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
