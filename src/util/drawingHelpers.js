const scale = 20;

export const createElement = (name, attributes, ...children) => {
  const element = document.createElement(name);
  for (let attribute of Object.keys(attributes)) element.setAttribute(attribute, attributes[attribute]);
  for (let child of children) element.appendChild(child);
  return element;
};

export const drawGrid = (level) => createElement(
  'table',
  {
    class: 'background',
    style: `width: ${level.width * scale}px`,
  },
  ...level.rows.map((row) => createElement(
    'tr', { style: `height: ${scale}px` }, ...row.map((cell) => createElement('td', { class: cell }))
  )),
);

export const drawActors = (actors) => createElement('div', {}, ...actors.map((actor) => {
  let actorElement = createElement('div', { class: `actor ${actor.type}` });
  actorElement.style.width = `${actor.size.x * scale}px`;
  actorElement.style.height = `${actor.size.y * scale}px`;
  actorElement.style.left = `${actor.position.x * scale}px`;
  actorElement.style.top = `${actor.position.y * scale}px`;
  return actorElement;
}));
