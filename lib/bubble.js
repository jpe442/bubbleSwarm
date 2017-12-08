import Bubbles from './bubbles'
import Util from './utils'
const DEFAULTS = {
  COLOR: "pink",
  RADIUS: 25,
  SPEED: 1
};


class Bubble extends Bubbles {
  constructor(options = {}) {
    options.pos = options.pos || options.game.randomPosition();
    options.color = options.color || DEFAULTS.COLOR;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
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

export default Bubble;




