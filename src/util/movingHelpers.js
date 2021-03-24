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
  return down;
};

export const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);
