/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {

  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  norm(vec) {
    return Util.dist([0, 0], vec);
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  isIntersect(point, bubble) {
    return Math.sqrt((point.x - bubble.pos[0]) ** 2 + (point.y - bubble.pos[1]) ** 2) < bubble.radius;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Util);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_screen__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);





document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('canvas');
  const pauseButton = document.getElementById('pause-button')
  const restartButton = document.getElementById('restart-button')

  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  let newViewScreen = new __WEBPACK_IMPORTED_MODULE_1__view_screen__["a" /* default */](game, ctx);

  pauseButton.addEventListener('click', (e) => {
    console.log("in pause button")
    newViewScreen.pause();
  })

  restartButton.addEventListener('click', (e) => {
    console.log("in restart button")
    newViewScreen.pause();
    game.clearScreen(ctx);
    game.resetMessage();
    game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
    newViewScreen = new __WEBPACK_IMPORTED_MODULE_1__view_screen__["a" /* default */](game, canvas.getContext("2d"));
    newViewScreen.start();
  })
  
  canvas.addEventListener('click', (e) => {
    console.log([e.clientX, e.clientY])
    const mousePoint = {
      x: e.clientX - 8,
      y: e.clientY - 8,
    };

    game.bubbles.forEach(bubble => {
      // console.log("here in mousecheck")
      // console.log(mousePoint)
      // console.log(Util.isIntersect(mousePoint, bubble))
      if (__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].isIntersect(mousePoint, bubble)) {
        // alert('clicked on a bubble')
        // console.log("clicked on a bubble")
        bubble.remove();
      };
    })
  
});

  newViewScreen.start();

})

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bubble__ = __webpack_require__(4);




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
    this.timer = new __WEBPACK_IMPORTED_MODULE_1__timer__["a" /* default */](10);
    this.paused = false;
    // this.gameOn = true;
    Game.BG_COLOR = "teal";

  }

  
  add(bubble) {
      this.bubbles.push(bubble);
  };

  addBubbles() {
    // console.log("yo in addBubbles")
    if (this.stage === 1) {
      var stage = STAGE_1;
      console.log(Game.NUM_BUBBLES)
      console.log("yo in addBubbles stage 1")
    }else{
      var stage = STAGE_2;
      console.log(Game.NUM_BUBBLES)
      console.log("yo in addBubbles stage 2")

    }

    for (let i = 0; i < Game.NUM_BUBBLES/2; i++) {
      console.log("loading bubbles")
      this.add(new __WEBPACK_IMPORTED_MODULE_2__bubble__["a" /* default */]({ game: this, radius: stage.RADIUS_A, color: stage.COLOR_A, vel: __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].randomVec(stage.SPEED_A) }));
    }
    for (let i = 0; i < Game.NUM_BUBBLES/2; i++) {
      this.add(new __WEBPACK_IMPORTED_MODULE_2__bubble__["a" /* default */]({ game: this, radius: stage.RADIUS_B, color: stage.COLOR_B, pointVal: 20, vel: __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].randomVec(stage.SPEED_B) }));
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
        if (bubble.outOfBounds()) {
          // console.log(bubble.pos)
          console.log("in draw")
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

 
  // remove(bubble) {
  //   this.bubbles.splice(this.bubbles.indexOf(bubble)) 
  // };
  
  gameOver() {
    let gameMessage = document.getElementById('game-message');
    console.log("game over")
    this.timer.time = 0;
    gameMessage.innerHTML = "GAME OVER";
  }

  gameWon () {
    let gameMessage = document.getElementById('game-message');
    this.timer.time = 0;
    gameMessage.innerHTML = "YOU WIN!";
  }

  pause (timediff) {
    let gameMessage = document.getElementById('game-message');
    if (!this.paused) {
      clearInterval(this.timer.countDown);
      gameMessage.innerHTML = "PAUSED";
      this.paused = true;
    }else{
      this.timer = new __WEBPACK_IMPORTED_MODULE_1__timer__["a" /* default */](timediff);
      this.paused = false;
      this.resetMessage();
    }
  }

  resetMessage () {
    console.log("resetting message")
    let gameMessage = document.getElementById('game-message');
    gameMessage.innerHTML = "";
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
            
          // this.bubbles[j].reverse();
          console.log("bubbles[i] /and bubble[j] are colliding");
          return;
        }
      }
    }
  };

  handleTimeout() {
    console.log(this.stage)
    switch(this.stage) {
      case 1:
        if (this.points < 200) {
          console.log("in case 1 in game.handleTimeout")
          this.gameOver();
          this.stage = 0;
        }else{
          this.stage++;
          Game.NUM_BUBBLES += 20;
          Game.BG_COLOR = "lightblue"
          this.bubbles = [];
          this.addBubbles();
          console.log("Hi from handleTimeout in game.js")
          // console.log(this.bubbles.length)
          this.timer = new __WEBPACK_IMPORTED_MODULE_1__timer__["a" /* default */](15)
          this.resetMessage();
        }
      case 2:
        if (this.timer.time <= 0) {
          console.log("case 2")
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
    // console.log(this.bubbles)
    // console.log("stepping")
    this.moveBubbles(delta);
    this.checkCollisions();
    this.updatePoints();
    this.timer.display();
    // if (this.timer.timeCheck()) {
    //   this.gameOver();
    // }

    // if (this.timer.time) {
    //   this.gameOver();
    // }
    // console.log(this.timer.time)
    // console.log(this.points)
  }
};

Game.BG_COLOR = "teal";
Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_BUBBLES = 40;


/* harmony default export */ __webpack_exports__["a"] = (Game);


  

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Timer);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bubbles__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


const DEFAULTS = {
  COLOR: "pink",
  RADIUS: 25,
  SPEED: 1
};


class Bubble extends __WEBPACK_IMPORTED_MODULE_0__bubbles__["a" /* default */] {
  constructor(options = {}) {
    options.pos = options.pos || options.game.randomPosition();
    options.color = options.color || DEFAULTS.COLOR;
    options.vel = options.vel || __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].randomVec(DEFAULTS.SPEED);
    // options.vel = [1,1];
    options.radius = options.radius || DEFAULTS.RADIUS;
    options.pointVal = options.pointVal || 10
  ;
    super(options)
    // this.pointVal = options
    // console.log(this.pos)
  }

  outOfBounds() {
    if ((this.pos[0] > 800 || this.pos[0] < 0) ||
    (this.pos[1] > 800) || this.pos[1] < 0) {
      return true;
    }
    return false
  }

  remove() {
    console.log(this.pointVal)
    this.game.points += this.pointVal;
    console.log(this.game.points)
    this.game.bubbles.splice(this.game.bubbles.indexOf(this), 1)
  };

  
}

/* harmony default export */ __webpack_exports__["a"] = (Bubble);






/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


function Bubbles(options) {
  this.pos = options.pos;
  this.vel = options.vel; 
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.pointVal = options.pointVal;
};

Bubbles.prototype.collideWith = function collideWith(otherObject) {
  this.vel[0] = -this.vel[0];
  this.vel[1] = -this.vel[1];
  console.log("collideWith")
  return true;
};

Bubbles.prototype.draw = function draw(ctx) {

  ctx.beginPath();
 
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.strokeStyle = "black";
  ctx.lineWidth = .1;
  ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();

  if (this.pos[0] - this.radius < 0 || this.pos[0] + this.radius > 800) this.vel[0] = -this.vel[0];
  if (this.pos[1] - this.radius < 0 || this.pos[1] + this.radius > 600) this.vel[1] = -this.vel[1];

};

Bubbles.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].dist(this.pos, otherObject.pos);
  // console.log("in isCollidedWith")
  // console.log(centerDist === (this.radius * 2));
  if (centerDist <= (this.radius + otherObject.radius)) {
    this.vel[0] = -this.vel[0];
    this.vel[1] = -this.vel[1];
  } ;
};

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
Bubbles.prototype.move = function move(timeDelta) {

  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
};



// Bubble.prototype.remove = function remove() {
//   this.game.remove(this);
// };

/* harmony default export */ __webpack_exports__["a"] = (Bubbles);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (ViewScreen);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map