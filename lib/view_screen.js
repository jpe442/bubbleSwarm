class ViewScreen {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this))
  }


  handleTimeout() {
    this.game.handleTimeout();

  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    if (this.game.timer.time > 0){
      // console.log(this.game.timer.time)
      // console.log("funny business around here...")
      // console.log(this.game.bubbles.length)
      requestAnimationFrame(this.animate.bind(this));
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