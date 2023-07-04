import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const submitBtn = form.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', onSubmitBtnClick => {
  onSubmitBtnClick.preventDefault(); // Зупиняємо дію за замовчуванням (відправку форми)

  const delayInput = form.querySelector('input[name="delay"]');
  const stepInput = form.querySelector('input[name="step"]');
  const amountInput = form.querySelector('input[name="amount"]');

  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  

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

for (let i = 0; i < amount; i++) {
  createPromise(i + 1, firstDelay + i * step)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
});
   

