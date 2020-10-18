/* The Fisher–Yates shuffle is an algorithm for generating a random permutation of a finite sequence—in plain terms, the algorithm shuffles the sequence. The algorithm effectively puts all the elements into a hat; it continually determines the next element by randomly drawing an element from the hat until no elements remain. The algorithm produces an unbiased permutation: every permutation is equally likely. The modern version of the algorithm is efficient: it takes time proportional to the number of items being shuffled and shuffles them in place. */

const shuffleColors = (colors) => {
  for (let i = colors.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
};

/* colorsGenerator function depends on the number of received column and row. This function returns colors array which is equal to the half of the total number of tiles. */

const colorsGenerator = (column, row) => {
  const numberOfColors = (column * row) / 2;
  let colors = [];

  for (let i = 0; i < numberOfColors; i++) {
    const hueColor = (i * 360) / numberOfColors;
    colors.push(hueColor);
  }
  return colors;
};

 /* tilesGenerator function receives colors array and returns objects (tiles) array. Each tile consists of a color and a certain state: open or closed, hidden or not. */

const tilesGenerator = (colors) => {
  let tilesOnTheBoard = [];
  for (let i = 0; i < colors.length; i++) {
    tilesOnTheBoard.push({ color: colors[i], isOpened: false, isHidden: false });
  }
  return tilesOnTheBoard;
};
/* JSON.parse and JSON.stringify is simple way to Deep copy. The JSON.stringify() method converts a JavaScript value to a JSON string.The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. */
export const deepCoppyArray = (array) => {
  return JSON.parse(JSON.stringify(array));
}

export const init = (column, row) => {
  // generate colors array for tiles
  let colors = colorsGenerator(column, row);
  // duplicate colors array
  colors = colors.concat(colors);
  // generate tiles array
  let tilesOnTheBoard = tilesGenerator(colors);
  // shuffle tiles
  tilesOnTheBoard = shuffleColors(tilesOnTheBoard);
  return tilesOnTheBoard;
};
