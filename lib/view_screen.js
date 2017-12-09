class ViewScreen {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.paused = false;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this))
  }
  
  handleTimeout() {
    this.game.handleTimeout();
  }

  pause() {
    if (this.paused) {
      requestAnimationFrame(this.animate.bind(this))
      this.game.pause(this.game.timer.time-1);
    }else{
      cancelAnimationFrame(this.rFrame)
      this.paused = true;
      this.game.pause(this.game.timer.time-1);
    }
  }

  animate(time) {
    if (this.paused) {
      this.paused = false;
      var timeDelta = 0;
    }else{
      var timeDelta = time - this.lastTime;
    }
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    if (this.game.timer.time > 0){
      this.rFrame = requestAnimationFrame(this.animate.bind(this));
      this.frame = this.animate.bind(this);
    }else{
      this.handleTimeout();
      if (this.game.stage > 0) {
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }
  
}

export default ViewScreen;