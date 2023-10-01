function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timer = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timer = setInterval(
    () =>
      (document.querySelector('body').style.backgroundColor =
        getRandomHexColor()),
    1000
  );
});

stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  stopBtn.disabled = true;
  startBtn.disabled = false;
});
