import Vector from './util/Vector.js';
import { levelCharacters } from "./util/renderingHelpers.js";

class Level {
  constructor(plan) {
    const rows = plan.trim().split('\n').map(line => [...line]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => row.map((character, x) => {
      const type = levelCharacters[character];
      if (typeof type === 'string') return type;
      this.startActors.push(type.create(new Vector(x, y), character));
      return 'empty';
    }));
  }
}

Level.prototype.touches = function(position, size, type) {
  const xStart = Math.floor(position.x);
  const xEnd = Math.ceil(position.x + size.x);
  const yStart = Math.floor(position.y);
  const yEnd = Math.ceil(position.y + size.y);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      const isOutSide = x < 0 || x >= this.width || y < 0 || y > this.height;
      const here = isOutSide ? 'wall' : this.rows[y][x];
      if (here === type) return true;
    }
  }
  return false;
};

export default Level;
