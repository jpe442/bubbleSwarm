import Bubbles from './bubbles'
import Util from './utils'
const DEFAULTS = {
  COLOR: "blue",
  RADIUS: 25,
  SPEED: 1
};


class Bubble extends Bubbles {
  constructor(options = {}) {
    options.pos = options.pos || options.game.randomPosition();
    options.color = DEFAULTS.COLOR;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    // options.vel = [1,1];
    options.radius = DEFAULTS.RADIUS;
  ;
    super(options)
    this.pointVal = 10
    // console.log(this.pos)
  }

  remove() {
    console.log(this.pointVal)
    this.game.points += this.pointVal;
    console.log(this.game.points)
    this.game.bubbles.splice(this.game.bubbles.indexOf(this), 1)
    
  };

  
}

export default Bubble;




