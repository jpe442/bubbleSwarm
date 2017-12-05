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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_screen__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(4);





document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  
  canvas.addEventListener('click', (e) => {
    const mousePoint = {
      x: e.clientX - 8,
      y: e.clientY - 8,
    };

    game.bubbles.forEach(bubble => {
      console.log("here in mousecheck")
      console.log(mousePoint)
      console.log(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].isIntersect(mousePoint, bubble))
      if (__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].isIntersect(mousePoint, bubble)) {
        // alert('clicked on a bubble')
        console.log("clicked on a bubble")
        bubble.remove();
      };
    })

  
  
});


  new __WEBPACK_IMPORTED_MODULE_1__view_screen__["a" /* default */](game, ctx).start();

 
})

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bubble__ = __webpack_require__(2);



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
      this.add(new __WEBPACK_IMPORTED_MODULE_0__bubble__["a" /* default */]({ game: this }));
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

  /* harmony default export */ __webpack_exports__["a"] = (Game);


  

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bubbles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(4);


const DEFAULTS = {
  COLOR: "blue",
  RADIUS: 7,
  SPEED: 1
};


class Bubble extends __WEBPACK_IMPORTED_MODULE_0__bubbles__["a" /* default */] {
  constructor(options = {}) {
    options.pos = options.pos || options.game.randomPosition();
    options.color = DEFAULTS.COLOR;
    options.vel = options.vel || __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].randomVec(DEFAULTS.SPEED);
    // options.vel = [1,1];
    options.radius = DEFAULTS.RADIUS;
    super(options)
    console.log(this.pos)
  }

  remove() {
    this.game.bubbles.splice(this.game.bubbles.indexOf(this), 1)
  };

  
}

/* harmony default export */ __webpack_exports__["a"] = (Bubble);






/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(4);


function Bubbles(options) {
  this.pos = options.pos;
  this.vel = options.vel; 
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

Bubbles.prototype.collideWith = function collideWith(otherObject) {
  this.vel[0] = -this.vel[0];
  this.vel[1] = -this.vel[1];
  console.log("collideWith")
  return true;
};

Bubbles.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();

  if (this.pos[0] - this.radius < 0 || this.pos[0] + this.radius > 800) this.vel[0] = -this.vel[0];
  if (this.pos[1] - this.radius < 0 || this.pos[1] + this.radius > 600) this.vel[1] = -this.vel[1];

};

Bubbles.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].dist(this.pos, otherObject.pos);
  // console.log("in isCollidedWith")
  // console.log(centerDist === (this.radius * 2));
  if (centerDist < (this.radius * 2)) {
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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ViewScreen {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this))
  }

  animate(time) {

    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ViewScreen);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map