// Fisher–Yates Shuffle
export const shuffleColors = (colors) => {
    for (let i = colors.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return colors;
}

export const colorsGenerator = (column, row) => {
    const numberOfColors = (column*row)/2;
    let colors = [];
    
    for (let i = 0; i < numberOfColors; i++) {
        const hueColor = i * 360/numberOfColors;
        colors.push(hueColor);
    }
    return colors; 
}