import Vector from "../util/Vector.js";
import State from "../State.js";

class Coin {
  constructor(position, basePosition, wobble) {
    this.position = position;
    this.basePosition = basePosition;
    this.wobble = wobble;
  }

  get type() {
    return 'coin';
  }

  static create(position) {
    let basePosition = position.plus(new Vector(0.2, 0.1));
    // Todo: learn how the wobble is calculated
    return new Coin(basePosition, basePosition, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vector(0.6, 0.6);

Coin.prototype.collide = function(gameState) {
  const filtered = gameState.actors.filter((actor) => actor !== this);
  let status = gameState.status;
  if (!filtered.some(actor => actor.type === 'coin')) status = 'won';
  return new State(gameState.level, filtered, status);
};

// Todo: change to find a better place for these variables
const wobbleSpeed = 8, wobbleDist = 0.07;
Coin.prototype.update = function(time) {
  const wobble = this.wobble + time * wobbleSpeed;
  const wobblePosition = Math.sin(wobble) * wobbleDist;
  return new Coin(this.basePosition.plus(new Vector(0, wobblePosition)), this.basePosition, wobble);
};

export default Coin;
