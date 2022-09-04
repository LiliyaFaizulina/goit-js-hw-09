const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
let intervalId = null;

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

setAttrDisabled(stopBtnRef);

function onStartBtnClick(e) {
  setAttrDisabled(e.target);
  removeAttrDisabled(stopBtnRef);
  colorBodySwitcher();
  intervalId = setInterval(colorBodySwitcher, 1000);
}

function onStopBtnClick(e) {
  setAttrDisabled(e.target);
  removeAttrDisabled(startBtnRef);
  clearInterval(intervalId);
}

function setAttrDisabled(btn) {
  btn.setAttribute('disabled', 'true');
}

function removeAttrDisabled(btn) {
  btn.removeAttribute('disabled');
}

function colorBodySwitcher() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
