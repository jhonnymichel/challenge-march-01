export default class Ticker {
  constructor(config = { tickInterval: 1000 }) {
    this.tickInterval = config.tickInterval || 1000;
    this.callback = config.callback;
    this.isCounting = false;
    this.delta = 0;
    this.currentTick = 0;
    this.lastTickTimeStamp = 0;
    this.tick = this.tick.bind(this);
  }

  start(amount = 0) {
    this.lastTickTimeStamp = Date.now() - this.tickInterval;
    this.lastDelay = 0;
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
      if (amount && currentTick >= amount) {
        return this.reset();
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

  reset() {
    this.delta = 0;
    this.currentTick = 0;
    this.isCounting = false;
  }
}
