import {
  createElement,
  drawGrid,
  drawActors,
} from "./util/drawingHelpers.js";

class DOMDisplay {
  constructor(parent, level) {
    this.dom = createElement("div", { class: 'game' }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}

// Todo: change to use arrow functions
DOMDisplay.prototype.syncState = function(state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
  const scale = 20;

  const width = this.dom.clientWidth;
  const height = this.dom.clientHeight;
  // Todo: Learn how this margin works
  const margin = width / 3;

  const left = this.dom.scrollLeft, right = left + width;
  const top = this.dom.scrollTop, bottom = top + height;

  const player = state.player;
  const center = player.position.plus(player.size.times(0.5)).times(scale);

  // Todo: Learn how the scrolling works
  if (center.x < left + margin) this.dom.scrollLeft = center.x - margin;
  else if (center.x > right - margin) this.dom.scrollLeft = center.x + margin - width;

  if (center.y < top + margin) this.dom.scrollTop = center.y - margin;
  else if (center.y > bottom - margin) this.dom.scrollTop = center.y + margin - height;
}

export default DOMDisplay;
