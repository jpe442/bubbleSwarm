## Background and Overview

bubbleSwarm is a simple click/tap game in which bubbles of various sizes bounce around a screen for a given amount of time. "Popping" certain bubbles awards the player with points, with some bubbles being worth more than others. Some bubbles deduct points. The goal is to attain the highest score possible within the given time allotment. Bubbles shrink in size once a level is complete, causing the game to get that much more difficult as a side-effect.

The game leverages the intrinsic satisfaction of popping a bubble and simple pleasant visual experience, to create an easy-to-play and highly replayable strategy/dexterity clicker game. 

## Functionality & MVP

bubbleSort features:

  - random bubble generation of various clickable bubble-types to populate screen

  - stage-timer/display

  - score display

  - start, pause and restart buttons

  - an About modal describing basic rules

## Wireframes

The game consists of one main view primarilycomprised of a dashboard and game screen. The dashboard has buttons to (a) start a new game (b) pause the game, or (c) call up the About page modal to view the game rules. Once the timer finishes counting, points are calculated and either the game is over or the next stage begins.



Wireframe here...



## Architecture and Technologies

This project utilizes these technologies:
+ Vanilla JavaScript for overall structure, physics and game logic.
+ HTML5 Canvas for DOM access, manipulation and rendering.
+ Webpack to bundle and serve the various scripts.
+ There will be a webpack entry file, and the following three scripts:

view_screen.js: this script will handle the logic for creating and updating the necessary DOM elements.

bubbles.js: this script will house the physics logic for the bubbles.

game.js: this script will house the overall procedural game logic, timer, stage, and points information.

## Implementation Timeline

- Over the weekend: 
[ ] Go back over my asteroids project to reacquaint with the implementation of a basic physics framework and HTML 5 Canvas.

- Day 1: Webpack setup, bubbles bouncing with inertia in gravity, click to destroy bubbles

[ ] Node and Webpack setup
[ ] Basic layout index page
[ ] Implement various & random bubble spawn(s), bouncy walls, bouncy bubbles

- Day 2: Effects and dashboard
[ ] Final tune gravity
[ ] Shrink(/enlarge) effect(s)
[ ] Dashboard basic layout functionalty

- Day 3: Final gameplay logic & functionality
[ ] Points and "stage"/"timer"
[ ] Increase difficulty functionality
[ ] Pause, new game, and About modal

- Day 4: Final styling and other final aesthetic touches
[ ] Smooth & appealing CSS
[ ] Final tune gameplay

- Bonus Features:

+ special effect bubbles (spread-effect, flash-effect)
+ simple sound effects (bubble popping, etc...)
+ speed adjustment slider
+ physics adjustment slider
+ number of bubbles at once slider
+ choose API call to fill bubbles with random messages ()



