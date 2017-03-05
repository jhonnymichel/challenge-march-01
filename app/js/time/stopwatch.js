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
    if (this.isRunning) {
      return console.error('can\'t start a run');
    }
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
    document.removeEventListener('visibilityChange',
      this.onVisibilityChange);
    this.isRunning = false;
    this.stop();
    if (this.cycleCallback) {
      this.cycleCallback({
        minutes: '00',
        seconds: '00',
        miliseconds: '00',
      });
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
  formatTwoDigits(number) {
    return number > 9 ? number : '0'.concat(number);
  }
  formatStopwatchString(currentTime) {
    const pastTime = currentTime - this.initialTime;
    const minutesNumber = Math.floor(pastTime / 1000 / 60);
    const minutes = this.formatTwoDigits(minutesNumber);
    const seconds = this.formatTwoDigits(Math.floor(pastTime / 1000 - (60 * minutesNumber)));
    let miliseconds = (pastTime / 1000)
      .toString()
      .split('.')[1];
    if (miliseconds) {
      miliseconds = miliseconds.substring(0, 2);
    } else {
      miliseconds = '00';
    }
    return {
      minutes, seconds, miliseconds,
    };
  }
}
