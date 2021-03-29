import Vector from "../util/Vector.js";
import State from "../State.js";

class Monster {
  constructor(position, speed) {
    this.position = position;
    this.speed = speed;
  }

  get type() {
    return 'monster';
  }

  static create(position) {
    return new Monster(position, new Vector(4, 0));
  }
}

Monster.prototype.size = new Vector(1, 1);

Monster.prototype.collide = function (gameState) {
  const { player } = gameState;
  if (player.position.y + player.size.y - this.position.y < 0.25) {
    const filtered = gameState.actors.filter(actor => actor !== this);
    return new State(gameState.level, filtered, gameState.status);
  }
  return new State(gameState.level, gameState.actors, 'lost');
};

Monster.prototype.update = function (time, gameState) {
  // Todo: Change to enhance this monster chasing and wall bouncing relationship
  const direction = gameState.player.position.x < this.position.x ? -1 : 1;
  const newPosition = this.position.plus(this.speed.times(time * direction));
  if (!gameState.level.touches(newPosition, this.size, 'wall')) return new Monster(newPosition, this.speed);
  return this;
};

export default Monster;
