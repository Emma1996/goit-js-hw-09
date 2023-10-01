import Notiflix from 'notiflix';

Notiflix.Notify.init();

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

// prepare html elements
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('form');

const onFormSubmit = () => {
  const amountValue = Number.parseInt(amount.value);
  const firstDelay = Number.parseInt(delay.value);
  const stepDelayValue = Number.parseInt(step.value);

  for (let i = 0; i < amountValue; i++) {
    console.log(firstDelay, stepDelayValue);
    let delay = 0;
    if (i == 0) {
      delay = Number.parseInt(firstDelay);
    } else {
      delay = Number.parseInt(firstDelay + stepDelayValue * i);
    }

    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
  }
};

form.addEventListener('submit', evt => {
  evt.preventDefault();
  onFormSubmit();
});
