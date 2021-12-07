class Timer {
    constructor() {
        this.duration = 900;
        this.audio = new Audio('assets/timer-bell.mp3');
    }

  minutes = 15;
  seconds = 0;
  minutesValue = document.querySelector('.minutes-value');
  secondsValue = document.querySelector('.seconds-value'); 

  start() {
    this.timerID = setInterval(() => {
    this.duration = this.duration - 1;
    this.minutes = Math.trunc(this.duration / 60);
    this.seconds = this.duration % 60;
    this.minutesValue.value = this.minutes;
    this.secondsValue.value = this.seconds;
    console.log(this.minutes, this.seconds);
}, 1000);
}
stop() {
  clearInterval(this.timerID);

}
edit() {

}
}
window.onload = function load() {
  const pomodoroTimer = new Timer();

  const startButton = document.querySelector('.starter-button');
  
  let ifStart = true;
  startButton.addEventListener('click', () => {
    if (ifStart) {
      pomodoroTimer.start();
      ifStart = false;
      startButton.textContent = 'stop';
      // minutesValue.value = minutes;
      // secondsValue.value = seconds;
    } else {
      pomodoroTimer.stop();
      ifStart = true;
      startButton.textContent = 'start';
    }
  });

};