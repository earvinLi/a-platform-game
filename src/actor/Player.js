import Vector from '../util/Vector.js';

class Player {
  constructor(position, speed) {
    this.position = position;
    this.speed = speed;
  }

  get type() {
    return 'player';
  }

  static create(position) {
    return new Player(position.plus(new Vector(0, -0.5)), new Vector(0, 0));
  }
}

Player.prototype.size = new Vector(0.8, 1.5);

const playerXSpeed = 7, gravity = 30, jumpSpeed = 17;
Player.prototype.update = function(time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let position = this.position;
  const movedX = position.plus(new Vector(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, 'wall')) position = movedX;

  let ySpeed = this.speed.y + time * gravity;
  const movedY = position.plus(new Vector(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, 'wall')) position = movedY;
  else if (keys.ArrowUp && ySpeed > 0) ySpeed = -jumpSpeed;
  else ySpeed = 0;

  return new Player(position, new Vector(xSpeed, ySpeed));
};

export default Player;
