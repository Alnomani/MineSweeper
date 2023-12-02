import IDict from "./IDict.js";
import Vector2 from "./Vector2.js";
import Queue from "./Queue";

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
    processed: boolean[][];
    connectedComponentSets: Set<string>[] = [];

    constructor(width: number, height: number) {
        this.field = this.createPlayingField(width, height);
        this.processed = this.createBooleanMatrix();
        console.log(this.findAllConnectedComponents());
    }

    public getField() {
        return this.field;
    }

    private createPlayingField(width: number, height: number): number[][] {
        console.log("creating field");
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

    private createBooleanMatrix(): boolean[][] {
        const boolMatrix: boolean[][] = [];
        for (let row = 0; row < this.field.length; row++) {
            boolMatrix[row] = [];
            for (let col = 0; col < this.field[0].length; col++) {
                boolMatrix[row][col] = false;
            }
        }
        return boolMatrix;
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

    public findAllConnectedComponents(): Set<string>[] {
        const cellQueue: Queue = new Queue();
        let currentCell: number;
        let currentSetIndex: number = 0;
        for (let row = 0; row < this.field.length; row++) {
            for (let col = 0; col < this.field[0].length; col++) {
                currentCell = this.field[row][col];
                if (!this.processed[row][col]) {
                    if (currentCell === 0) {
                        this.connectedComponentSets.push(new Set<string>());
                        this.processEmptyCell(cellQueue, new Vector2(row, col));
                        // cellQueue.printQueue();
                        while (!cellQueue.isEmpty()) {
                            let currentQueueLoc: Vector2 = cellQueue.dequeue();
                            //console.log(currentQueueLoc);
                            this.addEmptyNeighbors(currentQueueLoc, cellQueue);
                            // console.log("Done with neighbors");
                            // cellQueue.printQueue();
                            // console.log(JSON.stringify(this.processed));
                            // break;
                        }
                        currentSetIndex++;
                        // console.log("finished section");
                    } else {
                        this.processed[row][col] = true;
                    }
                }
            }
        }
        // console.log(JSON.stringify(this.processed));
        return this.connectedComponentSets;
    }

    private processEmptyCell(cellQueue: Queue, location: Vector2) {
        // console.log(
        //     `Location in processEmptyCell: ${JSON.stringify(location)}`
        // );
        cellQueue.enqueue(location);
        this.processed[location.x][location.y] = true;
        // console.log(JSON.stringify(this.processed));
        const len = this.connectedComponentSets.length;
        this.connectedComponentSets[len - 1].add(location.toString());
    }

    private addEmptyNeighbors(loc: Vector2, cellQueue: Queue) {
        // console.log("processEmptyNeighbors");
        let currentNeighbor: Vector2;
        this.neighborVectors.forEach((neighborVector) => {
            currentNeighbor = loc.add(neighborVector);
            if (!this.outOfRange(currentNeighbor)) {
                if (!this.processed[currentNeighbor.x][currentNeighbor.y]) {
                    if (this.cellIsEmpty(currentNeighbor)) {
                        this.processEmptyCell(cellQueue, currentNeighbor);
                    } else {
                        this.processed[currentNeighbor.x][currentNeighbor.y] =
                            true;
                    }
                }
            }
        });
    }

    private cellIsEmpty(currentLoc: Vector2): boolean {
        const { x, y } = currentLoc;
        return this.field[x][y] === this.empty;
    }

    private outOfRange(location: Vector2) {
        return location.outOfRange(this.field.length, this.field[0].length);
    }
}
