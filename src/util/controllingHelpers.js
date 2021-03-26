export const overlap = (actorOne, actorTwo) => (
  actorOne.position.x + actorOne.size.x > actorTwo.position.x &&
  actorOne.position.x < actorTwo.position.x + actorTwo.size.x &&
  actorOne.position.y + actorOne.size.y > actorTwo.position.y &&
  actorOne.position.y < actorTwo.position.y + actorTwo.size.y
);

const trackKeys = (keys) => {
  const down = Object.create(null);

  const track = (event) => {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === 'keydown';
      event.preventDefault();
    }
  };

  window.addEventListener('keydown', track);
  window.addEventListener('keyup', track);

  down.unregister = () => {
    window.removeEventListener('keydown', track);
    window.removeEventListener('keyup', track);
  };
  return down;
};

export const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

export let gamePaused = false;
export const trackEscapeKey = (animationHandler) => {
  const escapeKey = Object.create(null);

  const track = (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    gamePaused = !gamePaused;
    if (!gamePaused) animationHandler();
  };

  escapeKey.register = () => window.addEventListener('keydown', track);
  escapeKey.unregister = () => window.removeEventListener('keydown', track);

  return escapeKey;
};
