import Ticker from './core/Ticker.js';

export default class Clock extends Ticker {
  constructor() {
    super();
    this.date = new Date();
    const time = {
      hours: this.date.getHours(),
      minutes: this.date.getMinutes(),
      seconds: this.date.getSeconds(),
      miliseconds: this.date.getMilliseconds()
    };
    this.start(0, 1000, this.onTick);
  }

  onTick(tick) {
    console.log('tick');
    if (this.currentTick >= this.tickInterval) {
      console.log('it has actually finished lol');
    }
  }
}
