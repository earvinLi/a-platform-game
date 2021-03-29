import Level from "./Level.js";
import levelPlans from "./util/levelPlans.js";
import DOMDisplay from "./DOMDisplay.js";
// Todo: Learn why 'State' doesn't work here
import State from "./State.js";
import {
  arrowKeys,
  trackEscapeKey,
  gamePaused,
} from "./util/controllingHelpers.js";

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
  let gameState = State.start(level);
  let ending = 1;

  return new Promise((resolve) => {
    const escapeKey = trackEscapeKey(() => runAnimation(frame));
    arrowKeys.register();
    escapeKey.register();

    const frame = (time) => {
      if (gamePaused) return false;

      gameState = gameState.update(time, arrowKeys);
      display.syncState(gameState);

      if (gameState.status === 'playing') {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        arrowKeys.unregister();
        escapeKey.unregister();
        resolve(gameState.status);
        return false;
      }
    };

    runAnimation(frame);
  });
};

const runGame = async (levels, Display) => {
  let lives = 3;

  for (let level = 1; level < levels.length;) {
    console.log(`You still have ${lives} ${lives > 1 ? 'lives' : 'life'}.`);
    const status = await runLevel(new Level(levels[level]), Display);

    if (status === 'lost') {
      lives--;
      if (lives !== 0) console.log('You lost one life!');
    }

    if (status === 'won') level++;
    else if (lives === 0) return 'You died!';
  }

  return 'You\'ve won!';
};

runGame(levelPlans, DOMDisplay).then((message) => console.log(message));
