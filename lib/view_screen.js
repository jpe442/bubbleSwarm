class ViewScreen {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this))
  }

  stop() {
    this.lastTime = 0;
    this.game.clearScreen(this.ctx);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    if (this.game.timer.time > 0){
      requestAnimationFrame(this.animate.bind(this));
    }else{
      this.stop()
    }
  }
}

export default ViewScreen;