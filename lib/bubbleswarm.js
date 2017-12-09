import Game from './game'
import ViewScreen from './view_screen'
import Util from './utils'


document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('canvas');
  const pauseButton = document.getElementById('pause-button')
  const restartButton = document.getElementById('restart-button')
  const modalScreen = document.getElementById('fade')

  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  let game = new Game();
  let newViewScreen = new ViewScreen(game, ctx);

  pauseButton.addEventListener('click', (e) => {
    newViewScreen.pause();
  })

  restartButton.addEventListener('click', (e) => {
    newViewScreen.pause();
    game.clearScreen(ctx);
    game.resetMessage();
    game = new Game();
    newViewScreen = new ViewScreen(game, canvas.getContext("2d"));
    newViewScreen.start();
  })
  
  canvas.addEventListener('click', (e) => {
    const mousePoint = {
      x: e.clientX - 8,
      y: e.clientY - 8,
    };

    game.bubbles.forEach(bubble => {
      if (Util.isIntersect(mousePoint, bubble)) {
        bubble.remove();
      };
    })
  
});

  newViewScreen.start();

})