import Level from "./Level.js";
import levelPlans from "./util/levelPlans.js";
import DOMDisplay from "./DOMDisplay.js";
// Todo: Learn why 'GameState' doesn't work here
import GameState from "./GameState.js";
import { arrowKeys } from "./util/movingHelpers.js";

const runAnimation = (frameFunction) => {
  let lastTime = null;
  const frame = (time) => {
    if (lastTime !== null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunction(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const runLevel = (level, Display) => {
  const display = new Display(document.body, level);
  let gameState = GameState.start(level);
  let ending = 1;

  return new Promise((resolve) => {
    runAnimation((time) => {
      gameState = gameState.update(time, arrowKeys);
      display.syncState(gameState);

      if (gameState.status === 'playing') {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(gameState.status);
        return false;
      }
    });
  });
};

const runGame = async (levels, Display) => {
  for (let level = 0; level < levels.length;) {
    const status = await runLevel(new Level(levels[level]), Display);
    if (status === 'won') level++;
  }
};

runGame(levelPlans, DOMDisplay).then(() => console.log('You\'ve won!'));
