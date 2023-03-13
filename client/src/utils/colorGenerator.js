export const generateColor = (color1, color2) => {
  const r1 = parseInt(color1.slice(1, 3), 16); // red component of the first color
  const g1 = parseInt(color1.slice(3, 5), 16); // green component of the first color
  const b1 = parseInt(color1.slice(5, 7), 16); // blue component of the first color
  const r2 = parseInt(color2.slice(1, 3), 16); // red component of the second color
  const g2 = parseInt(color2.slice(3, 5), 16); // green component of the second color
  const b2 = parseInt(color2.slice(5, 7), 16); // blue component of the second color
  const r = Math.floor(Math.random() * (r2 - r1 + 1) + r1); // random red component
  const g = Math.floor(Math.random() * (g2 - g1 + 1) + g1); // random green component
  const b = Math.floor(Math.random() * (b2 - b1 + 1) + b1); // random blue component
  const color = `rgb(${r}, ${g}, ${b})`; // combine components into an RGB color string
  return color;
};
