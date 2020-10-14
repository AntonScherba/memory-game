// Fisher–Yates Shuffle
const shuffleColors = (colors) => {
    for (let i = colors.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return colors;
}

const colorsGenerator = (column, row) => {
    const numberOfColors = (column*row)/2;
    let colors = [];
    
    for (let i = 0; i < numberOfColors; i++) {
        const hueColor = i * 360/numberOfColors;
        colors.push(hueColor);
    }
    return colors; 
}

const tilesGenerator = (colors) => {
    let tilesOnTheBoard = [];
    for (let i = 0; i < colors.length; i++) {
        tilesOnTheBoard.push({color: colors[i], isOpened: false});
    }
    return tilesOnTheBoard;
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
}