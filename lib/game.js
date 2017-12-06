import Util from './utils'
import Timer from './timer'
import Bubble from './bubble'

const STAGE_1 = {
  COLOR_A: "pink",
  RADIUS_A: 25,
  SPEED_A: 1,
  COLOR_B: "lightblue",
  RADIUS_B: 20,
  SPEED_B: 2
};

const STAGE_2 = {
  COLOR_A: "orange",
  RADIUS_A: 20,
  SPEED_A: 1,
  COLOR_B: "purple",
  RADIUS_B: 10,
  SPEED_B: 2
};

class Game {
  constructor() {
    this.bubbles = [];
    this.stage = 1;
    this.addBubbles();
    this.points = 0;
    this.timer = new Timer(10);
  }

  add(bubble) {
      this.bubbles.push(bubble);
  };

  addBubbles() {
    // console.log("yo in addBubbles")
    if (this.stage === 1) {
      var stage = STAGE_1;
      console.log(stage)
      console.log("yo in addBubbles")
    }
    for (let i = 0; i < Game.NUM_BUBBLES/2; i++) {
      this.add(new Bubble({ game: this, radius: stage.RADIUS_A, color: stage.COLOR_A }));
    }
    for (let i = 0; i < Game.NUM_BUBBLES/2; i++) {
      this.add(new Bubble({ game: this, radius: stage.RADIUS_B, color: stage.COLOR_B, pointVal: 20, vel: Util.randomVec(2) }));
    }
  };

  clearScreen(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  }

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
  
  gameOver() {
    let gameMessage = document.getElementById('game-message');
    gameMessage.innerHTML = "GAME OVER"
  }

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
            return
          // this.bubbles[j].reverse();
          // console.log("bubbles[i] /and bubble[j] are colliding")
        }
      }
    }
  };

  updatePoints() {
    let pointsDisplay = document.getElementById('points-display')
    pointsDisplay.innerHTML = this.points;
  }

  step(delta) {
    this.moveBubbles(delta);
    this.checkCollisions();
    this.updatePoints();
    this.timer.display();
    if (this.timer.timeCheck()) {
      this.gameOver();
    }

    // if (this.timer.time) {
    //   this.gameOver();
    // }
    // console.log(this.timer.time)
    // console.log(this.points)
  }
};

Game.BG_COLOR = "#FFFFFF";
Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_BUBBLES = 30;



export default Game;


  