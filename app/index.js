import Clock from './js/time/Clock.js';

const clock = new Clock(onCycle);

function onCycle(date) {
  const hours = date.toTimeString().split(' ')[0]
    .substring(0, 5);
  document.body.innerHTML = hours;
}
