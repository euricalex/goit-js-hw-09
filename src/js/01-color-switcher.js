const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
  };
  refs.startBtn.addEventListener('click', onStartClick);
  refs.stopBtn.addEventListener('click', onStopClick);
  
  let timerId = 0;
  refs.startBtn.disabled = false;
  
  function onStartClick() {
    timerId = setInterval(() => {
        const bodyColor = getRandomHexColor();
        document.body.style.backgroundColor = bodyColor;
      }, 1000);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false // Блокуємо кнопку "Start"
  
  }
  
  function onStopClick() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true; // Розблоковуємо кнопку "Start"
  }
  
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  