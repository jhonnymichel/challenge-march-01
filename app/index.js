import Clock from './js/time/Clock.js';

const clock = new Clock(date => document.body.innerHTML = date.toTimeString());
