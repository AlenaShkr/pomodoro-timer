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
    if(this.seconds < 10) {
      this.seconds = `0${this.seconds}`;
    }
    if(this.minutes < 10) {
      this.minutes = `0${this.minutes}`;
    }
    this.minutesValue.value = this.minutes;
    this.secondsValue.value = this.seconds;
  }
  
  get timerDuration() {
    return this.duration;
  }

  set timerDuration(newDuration) {
    this.duration = newDuration;
  }

  start() {

    if(this.duration > 0) {
      this.timerID = setInterval(() => {
        this.showTime();
        this.duration = this.duration - 1;
      
      if(this.duration <= 5) {
        this.audio.play();
      }
      if(this.duration === -1) {
        clearInterval(this.timerID);
      }
      }, 1000);    
    } else this.stop();
    
}
stop() {
  clearInterval(this.timerID);
}

isEdit = false;
edit() {
  this.minutesValue.disabled = this.isEdit;
  this.secondsValue.disabled = this.isEdit;
  this.isEdit = !this.isEdit;
}
}

window.onload = function load() {

  const startButton = document.querySelector('.starter-button');
  const editButton = document.querySelector('.edit-button');
  const editIcon = editButton.querySelector('.edit-icon');
  const editIconChecked = editButton.querySelector('.edit-icon_checked');
  const timerArea = document.querySelector('.timer');
  const minutesValue = document.querySelector('.minutes-value');
  const secondsValue = document.querySelector('.seconds-value');
  
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
      editIcon.style = 'display: none';
      editIconChecked.style.display = 'block';
    } else {
      editIcon.style = 'display: block';
      editIconChecked.style.display = 'none';
    }
    pomodoroTimer.edit();
    ifEdit = !ifEdit;
  }
  let isStartClicked = false;
  startButton.addEventListener('click', () => {
    editButton.disabled = !editButton.disabled;
    handlerStart();
    isStartClicked = !isStartClicked;

  })
  let isEditClicked = false;
  editButton.addEventListener('click', () => {
    startButton.disabled = !startButton.disabled;
    handlerEdit();
    isEditClicked = !isEditClicked;
    timerArea.addEventListener('change', () => {
      let newTime = parseInt(minutesValue.value, 10) * 60 + parseInt(secondsValue.value, 10);
      pomodoroTimer.timerDuration = newTime;
      pomodoroTimer.showTime();
    })
  })  
};