import Ticker from './js/time/core/Ticker.js';

const ticker = new Ticker({
  tickInterval: 1000,
  callback: onFinished,
});

document.body.onclick = function() {
  ticker.start();
};

function onFinished() {
  console.log('TICK');
}
