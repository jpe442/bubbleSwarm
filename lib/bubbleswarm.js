import Game from './game'
import ViewScreen from './view_screen'
import Util from './utils'


document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('canvas');
  const pauseButton = document.getElementById('pause-button')
  const resetButton = document.getElementById('reset-button')

  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  const game = new Game();
  const newViewScreen = new ViewScreen(game, ctx)

  pauseButton.addEventListener('click', (e) => {
    console.log("in pause button")
    newViewScreen.pause();
  })
  
  
  canvas.addEventListener('click', (e) => {
    const mousePoint = {
      x: e.clientX - 8,
      y: e.clientY - 8,
    };

    game.bubbles.forEach(bubble => {
      // console.log("here in mousecheck")
      // console.log(mousePoint)
      // console.log(Util.isIntersect(mousePoint, bubble))
      if (Util.isIntersect(mousePoint, bubble)) {
        // alert('clicked on a bubble')
        // console.log("clicked on a bubble")
        bubble.remove();
      };
    })

  
  
  
});

  newViewScreen.start();

})