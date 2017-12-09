import Util from './utils'
import Timer from './timer'
import Bubble from './bubble'

const STAGE_1 = {
  COLOR_A: "pink",
  RADIUS_A: 25,
  SPEED_A: 1,
  COLOR_B: "yellow",
  RADIUS_B: 20,
  SPEED_B: 2
};  

const STAGE_2 = {
  COLOR_A: "orange",
  RADIUS_A: 20,
  SPEED_A: 2,
  COLOR_B: "purple",
  RADIUS_B: 12,
  SPEED_B: 2
};

class Game {
  constructor() {
    this.bubbles = [];
    this.stage = 1;
    this.addBubbles();
    this.points = 0;
    this.timer = new Timer(10);
    this.paused = false;
    Game.BG_COLOR = "teal";

  }

  add(bubble) {
      this.bubbles.push(bubble);
  };

  addBubbles() {
    if (this.stage === 1) {
      var stage = STAGE_1;
    }else{
      var stage = STAGE_2;
    }

    for (let i = 0; i < Game.NUM_BUBBLES/2; i++) {
      this.add(new Bubble({ game: this, radius: stage.RADIUS_A, color: stage.COLOR_A, vel: Util.randomVec(stage.SPEED_A) }));
    }
    for (let i = 0; i < Game.NUM_BUBBLES/2; i++) {
      this.add(new Bubble({ game: this, radius: stage.RADIUS_B, color: stage.COLOR_B, pointVal: 20, vel: Util.randomVec(stage.SPEED_B) }));
    }
    
      this.add(new Bubble({ game: this, radius: stage.RADIUS_A * .2, color: "red", pointVal: 500, vel: Util.randomVec(stage.SPEED_B*5)}))
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
        if (bubble.outOfBounds()) {
          bubble.pos = this.randomPosition();
          bubble.draw(ctx) 
        }else{
          bubble.draw(ctx);
        }  
      }); 
  };

  moveBubbles(delta) {
    this.bubbles.forEach(bubble => bubble.move(delta))
  };

  randomPosition() {
    return [(Game.DIM_X - 50) * Math.random(), (Game.DIM_Y -50) * Math.random()];
  };

  gameOver() {
    let gameMessage = document.getElementById('game-message');
    this.timer.time = 0;
    gameMessage.innerHTML = "-GAME OVER-";
  }

  gameWon () {
    let gameMessage = document.getElementById('game-message');
    this.timer.time = 0;
    gameMessage.innerHTML = "---YOU WIN!---";
  }

  pause (timediff) {
    let gameMessage = document.getElementById('game-message');
    if (!this.paused) {
      clearInterval(this.timer.countDown);
      gameMessage.innerHTML = "----PAUSED---- ";
      this.paused = true;
    }else{
      this.timer = new Timer(timediff);
      this.paused = false;
      this.resetMessage();
    }
  }

  resetMessage () {
    let gameMessage = document.getElementById('game-message');
    gameMessage.innerHTML = "";
  }

  checkCollisions() {
    for (let i = 0; i < this.bubbles.length; i++) {
      for (let j = 0; j < this.bubbles.length; j ++) {
      if (i === j) {
        j++;
        continue;
      }
        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {            
          return;
        }
      }
    }
  };

  handleTimeout() {
    switch(this.stage) {
      case 1:
        if (this.points < 200) {
          this.gameOver();
          this.stage = 0;
        }else{
          this.stage++;
          Game.BG_COLOR = "lightblue"
          this.bubbles = [];
          this.addBubbles();
  
          this.timer = new Timer(15)
          this.resetMessage();        }
      case 2:
        if (this.timer.time <= 0) {
          if (this.points < 700) {
            this.gameOver();
            this.stage = 0;
          }else{
            this.gameWon();
            this.stage = 0;
          }
        }
    }
  }

  updatePoints() {
    let pointsDisplay = document.getElementById('points-display')
    pointsDisplay.innerHTML = this.points;
  }

  step(delta) {
    this.moveBubbles(delta);
    this.checkCollisions();
    this.updatePoints();
    this.timer.display();
  }
};

Game.BG_COLOR = "teal";
Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_BUBBLES = 40;


export default Game;


  