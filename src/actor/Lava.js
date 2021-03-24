import Vector from "../util/Vector.js";
import GameState from "../GameState.js";

class Lava {
  constructor(position, speed, reset) {
    this.position = position;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return 'lava';
  }

  static create(position, character) {
    switch (character) {
      case '=': return new Lava(position, new Vector(2, 0));
      case '|': return new Lava(position, new Vector(0, 2));
      case 'v': return new Lava(position, new Vector(0, 3), position);
    }
  }
}

Lava.prototype.size = new Vector(1, 1);

Lava.prototype.collide = function(gameState) {
  return new GameState(gameState.level, gameState.actors, 'lost');
};

Lava.prototype.update = function(time, state) {
  const newPosition = this.position.plus(this.speed.times(time));
  if (!state.level.touches(newPosition, this.size, 'wall')) return new Lava(newPosition, this.speed, this.reset);
  else if (this.reset) return new Lava(this.reset, this.speed, this.reset);
  else return new Lava(this.position, this.speed.times(-1));
};

export default Lava;
