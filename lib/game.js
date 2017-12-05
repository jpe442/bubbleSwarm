
import Bubble from './bubble'

class Game {
  constructor() {
    this.bubbles = [];
    this.addBubbles();
  }

  add(bubble) {
      this.bubbles.push(bubble);
  };

  addBubbles() {
    for (let i = 0; i < Game.NUM_BUBBLES; i++) {
      this.add(new Bubble({ game: this }));
    }
  };

  draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.bubbles.forEach((bubble) => {
        bubble.draw(ctx);
      });
  };

  moveBubbles(delta) {
    this.bubbles.forEach(bubble => bubble.move(delta))
  };

  randomPosition() {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  };

 
  // remove(bubble) {
  //   this.bubbles.splice(this.bubbles.indexOf(bubble)) 
  // };
  

  checkCollisions() {
    for (let i = 0; i < this.bubbles.length; i++) {
      // console.log(this.bubbles[i])
      for (let j = 0; j < this.bubbles.length; j ++) {
        // console.log("test")
      if (i === j) {
        j++;
        continue;
      }
        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
          // if (this.bubbles[i].collideWith(this.bubbles[j])) return;
            return
          // this.bubbles[j].reverse();
          // console.log("bubbles[i] /and bubble[j] are colliding")
        }
      }
    }
  };

  step(delta) {
    this.moveBubbles(delta);
    this.checkCollisions();
  }
};

Game.BG_COLOR = "#FFFFFF";
Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_BUBBLES = 20;

  export default Game;


  