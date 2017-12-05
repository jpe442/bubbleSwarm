class Timer {
  constructor(seconds) {
    this.time = seconds;
    this.countDown = setInterval(this._tick.bind(this), 1000)
  }

  
  
  timeCheck() {
    if (this.time === 0) {
      clearInterval(this.countDown);
      return true;
    }
  }

  display() {
    let timerDisplay = document.getElementById('timer-display')
    timerDisplay.innerHTML = this.time;
  }

  _tick() {
    this.time -= 1
  }
}

export default Timer;