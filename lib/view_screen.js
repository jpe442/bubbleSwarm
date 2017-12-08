class ViewScreen {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.paused = false;
    // this.rFrame = requestAnimationFrame(this.animate.bind(this))
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this))
  }
  
  handleTimeout() {
    this.game.handleTimeout();
  }

  pause() {
    console.log("in pause")
    // console.log(this.lastTime)
    // let rFrame = requestAnimationFrame(this.animate.bind(this))
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
    // every call to animate requests causes another call to animate
    if (this.game.timer.time > 0){
      // console.log(this.game.timer.time)
      // console.log("funny business around here...")
      // console.log(this.game.bubbles.length)
      this.rFrame = requestAnimationFrame(this.animate.bind(this));
      this.frame = this.animate.bind(this);
    }else{
      console.log(this.game.timer.time)
      console.log("stopping")
      this.handleTimeout();
      if (this.game.stage > 0) {
        console.log("in animate")
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }
  
}

export default ViewScreen;