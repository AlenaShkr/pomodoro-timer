class Timer {
    constructor() {
        this.duration = 900;
        this.audio = new Audio('assets/timer-bell.mp3');
    }

  minutes = 0;
  seconds = 0;
  minutesValue = document.querySelector('.minutes-value');
  secondsValue = document.querySelector('.seconds-value'); 

  showTime() {
    this.minutes = Math.trunc(this.duration / 60);
    this.seconds = this.duration % 60;
    if(this.seconds === 0) {
      this.seconds = '00';
    }
    if(this.minutes < 10) {
      this.minutes = `0${this.minutes}`;
    }
    this.minutesValue.value = this.minutes;
    this.secondsValue.value = this.seconds;
  }
  
  get timerDuration() {
    return;
  }

  set timerDuration(newDuration) {
    this.duration = newDuration[0] * 60 + newDuration[1];
  }

  start() {
    this.timerID = setInterval(() => {
    this.duration = this.duration - 1;
    this.showTime();
    if(this.duration <= 5) {
      this.audio.play();
    }
}, 1000);
}
stop() {
  clearInterval(this.timerID);
}

edit() {
  console.log('hi');
  this.minutesValue.disabled = false;
  this.secondsValue.disabled = false;
  this.minutesValue.autofocus = true;

}
}

window.onload = function load() {

  const startButton = document.querySelector('.starter-button');
  const editButton = document.querySelector('.edit-button');
  const editIcon = editButton.querySelector('.edit-icon');
  const editIconChecked = editButton.querySelector('.edit-icon_checked');
  
  const pomodoroTimer = new Timer();

  let ifStart = true;
  let ifEdit = true;
  
  function handlerStart() {
    if (ifStart) {
      pomodoroTimer.start();
      ifStart = false;
      startButton.textContent = 'stop';
    } else {
      pomodoroTimer.stop();
      ifStart = true;
      startButton.textContent = 'start';
    }
  }
  
  function handlerEdit() {
    if(ifEdit) {
      pomodoroTimer.edit();
      editIcon.style = 'display: none';
      editIconChecked.style.display = 'block';
      ifEdit = false;
    } else {
      editIcon.style = 'display: block';
      editIconChecked.style.display = 'none';
      ifEdit = true;
    }
  }
};