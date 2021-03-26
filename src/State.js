import { overlap } from "./util/controllingHelpers.js";

class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, 'playing');
  }

  get player() {
    return this.actors.find(actor => actor.type === 'player');
  }
}

State.prototype.update = function(time, keys) {
  const actors = this.actors.map(actor => actor.update(time, this, keys));
  let newGameState = new State(this.level, actors, this.status);

  if (newGameState.status !== 'playing') return newGameState;

  const player = newGameState.player;
  if (this.level.touches(player.position, player.size, 'lava')) return new State(this.level, actors, 'lost');

  for (let actor of actors) {
    if (actor !== player && overlap(actor, player)) newGameState = actor.collide(newGameState);
  }
  return newGameState;
};

export default State;
