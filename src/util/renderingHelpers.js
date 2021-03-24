import Player from "../actor/Player.js";
import Coin from "../actor/Coin.js";
import Lava from "../actor/Lava.js";

export const levelCharacters = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  'o': Coin,
  '=': Lava,
  '|': Lava,
  'v': Lava,
};
