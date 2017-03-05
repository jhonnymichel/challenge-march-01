import Clock from './js/time/clock.js';
import Stopwatch from './js/time/stopwatch.js';

// const clock = new Clock(onCycle);
window. stopwatch = new Stopwatch(onStopwatchCycle);

document.body.onclick = function() {
  stopwatch.run();
};

function onStopwatchCycle(time) {
  document.body.innerHTML = String(time).substring(0, 5);
}


function onCycle(date) {
  const hours = date.toTimeString().split(' ')[0]
    .substring(0, 5);
  document.body.innerHTML = hours;
}
