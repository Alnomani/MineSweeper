import Vector2 from "./Vector2.js";
const outputElement = document.getElementById("container");
const bombFrequency = 1 / 6;
const bomb = -1;
const empty = 0;
const neighborVectors = [
    new Vector2(1, 0),
    new Vector2(-1, 0),
    new Vector2(0, 1),
    new Vector2(0, -1),
    new Vector2(1, 1),
    new Vector2(-1, 1),
    new Vector2(1, -1),
    new Vector2(-1, -1),
];
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
                bombLocations.push(new Vector2(row, col));
            }
            else {
                field[row][col] = empty;
            }
        }
    }
    addBombCounters(bombLocations, field);
    return field;
}
function addBombCounters(bombLocations, field) {
    bombLocations.forEach((bombLoc) => {
        updateNeighborsOf(bombLoc, field);
    });
    return field;
}
function updateNeighborsOf(loc, field) {
    let currentNeighbor;
    neighborVectors.forEach((neighborVector) => {
        currentNeighbor = loc.add(neighborVector);
        if (!currentNeighbor.outOfRange(field.length, field[0].length)) {
            if (field[currentNeighbor.x][currentNeighbor.y] !== bomb) {
                field[currentNeighbor.x][currentNeighbor.y] += 1;
            }
        }
    });
}
