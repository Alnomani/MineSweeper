import IDict from "./IDict.js";
import Vector2 from "./Vector2.js";

export default class BombMapGenerator {
    readonly bombFrequency: number = 1 / 6;
    readonly bomb: number = -1;
    readonly empty: number = 0;
    readonly neighborVectors: Vector2[] = [
        new Vector2(1, 0),
        new Vector2(-1, 0),
        new Vector2(0, 1),
        new Vector2(0, -1),
        new Vector2(1, 1),
        new Vector2(-1, 1),
        new Vector2(1, -1),
        new Vector2(-1, -1),
    ];
    readonly field: number[][];

    constructor(width: number, height: number) {
        this.field = this.createPlayingField(width, height);
    }
    public getField() {
        return this.field;
    }
    private createPlayingField(width: number, height: number): number[][] {
        const field: number[][] = [];
        let putBomb: boolean = false;
        const bombLocations: Vector2[] = [];
        for (let row = 0; row < width; row++) {
            field[row] = [];
            for (let col = 0; col < height; col++) {
                putBomb = Math.random() < this.bombFrequency;
                if (putBomb) {
                    field[row][col] = this.bomb;
                    bombLocations.push(new Vector2(row, col));
                } else {
                    field[row][col] = this.empty;
                }
            }
        }
        this.addBombCounters(bombLocations, field);
        return field;
    }

    private addBombCounters(bombLocations: Vector2[], field: number[][]) {
        bombLocations.forEach((bombLoc) => {
            this.updateNeighborsOf(bombLoc, field);
        });
        return field;
    }

    private updateNeighborsOf(loc: Vector2, field: number[][]) {
        let currentNeighbor: Vector2;
        this.neighborVectors.forEach((neighborVector) => {
            currentNeighbor = loc.add(neighborVector);
            if (!currentNeighbor.outOfRange(field.length, field[0].length)) {
                if (field[currentNeighbor.x][currentNeighbor.y] !== this.bomb) {
                    field[currentNeighbor.x][currentNeighbor.y] += 1;
                }
            }
        });
    }

    public createVisbililityMatrix(): boolean[][] {
        const visibilityMatrix: boolean[][] = [];
        for (let row = 0; row < this.field.length; row++) {
            visibilityMatrix[row] = [];
            for (let col = 0; col < this.field[0].length; col++) {
                visibilityMatrix[row][col] = false;
            }
        }
        return visibilityMatrix;
    }

    public createVisbililityDict(): IDict {
        const visibilityDict: IDict = {};
        for (let row = 0; row < this.field.length; row++) {
            for (let col = 0; col < this.field[0].length; col++) {
                visibilityDict[row.toString() + col.toString()] = false;
            }
        }
        return visibilityDict;
    }
}
