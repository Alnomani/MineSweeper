import Vector2 from "./Vector2.js";

// const outputElement = <HTMLElement>document.getElementById("container");
const bombFrequency: number = 1 / 6;
const bomb: number = -1;
const empty: number = 0;
const neighborVectors: Vector2[] = [
    new Vector2(1, 0),
    new Vector2(-1, 0),
    new Vector2(0, 1),
    new Vector2(0, -1),
    new Vector2(1, 1),
    new Vector2(-1, 1),
    new Vector2(1, -1),
    new Vector2(-1, -1),
];
const playingField: number[][] = createPlayingField(5, 5);

console.table(playingField);
//outputElement.innerHTML = gridString;

function createPlayingField(width: number, height: number): number[][] {
    const field: number[][] = [];
    let putBomb: boolean = false;
    const bombLocations: Vector2[] = [];
    for (let row = 0; row < width; row++) {
        field[row] = [];
        for (let col = 0; col < height; col++) {
            putBomb = Math.random() < bombFrequency;
            if (putBomb) {
                field[row][col] = bomb;
                bombLocations.push(new Vector2(row, col));
            } else {
                field[row][col] = empty;
            }
        }
    }
    addBombCounters(bombLocations, field);
    return field;
}

function addBombCounters(bombLocations: Vector2[], field: number[][]) {
    bombLocations.forEach((bombLoc) => {
        updateNeighborsOf(bombLoc, field);
    });
    return field;
}

function updateNeighborsOf(loc: Vector2, field: number[][]) {
    let currentNeighbor: Vector2;
    neighborVectors.forEach((neighborVector) => {
        currentNeighbor = loc.add(neighborVector);
        if (!currentNeighbor.outOfRange(field.length, field[0].length)) {
            if (field[currentNeighbor.x][currentNeighbor.y] !== bomb) {
                field[currentNeighbor.x][currentNeighbor.y] += 1;
            }
        }
    });
}
