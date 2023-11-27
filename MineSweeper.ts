const outputElement = <HTMLElement>document.getElementById("container");
const bombFrequency: number = 1 / 6;
const bomb: number = -1;
const empty: number = 0;
type tuple = [number, number];

const playingField: number[][] = createPlayingField(5, 5);

console.table(playingField);
//outputElement.innerHTML = gridString;

function createPlayingField(width: number, height: number): number[][] {
    const field: number[][] = [];
    let putBomb: boolean = false;
    const bombLocations: tuple[] = [];
    for (let row = 0; row < width; row++) {
        field[row] = [];
        for (let col = 0; col < height; col++) {
            putBomb = Math.random() < bombFrequency;
            if (putBomb) {
                field[row][col] = bomb;
                bombLocations.push([row, col]);
            } else {
                field[row][col] = empty;
            }
        }
    }
    return field;
}

function addBombCounters(bombLocations: tuple[], field: number[][]) {
    console.table(field);
    return field;
}

const up: tuple = [1, 0];
const down: tuple = [-1, 0];
const right: tuple = [0, 1];
const left: tuple = [0, -1];
