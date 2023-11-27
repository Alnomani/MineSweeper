"use strict";
const outputElement = document.getElementById("container");
const bombFrequency = 1 / 6;
const bomb = -1;
const empty = 0;
const playingField = createPlayingField(5, 5);
console.table(playingField);
function createPlayingField(width, height) {
    const field = [];
    let putBomb = false;
    const bombLocations = [];
    for (let row = 0; row < width; row++) {
        field[row] = [];
        for (let col = 0; col < height; col++) {
            putBomb = Math.random() < bombFrequency;
            if (putBomb) {
                field[row][col] = bomb;
                bombLocations.push([row, col]);
            }
            else {
                field[row][col] = empty;
            }
        }
    }
    console.log(bombLocations);
    return field;
}
