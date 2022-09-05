import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const [firstDelay, step, amount] = valueToNumber(e.target.elements);

  if (amount <= 0) {
    Notify.failure(`Put amount more than 0!`);
  }

  let delay = firstDelay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += step;
  }
}

function valueToNumber(arr) {
  return [...arr].map(el => Number(el.value));
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
