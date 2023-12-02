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
    connectedSets: Set<string>[] = [];
    bombLocations: Vector2[];

    constructor(width: number, height: number) {
        this.bombLocations = [];
        this.field = [];
        this.populatePlayingField(width, height);
        this.processed = this.createBooleanMatrix();
        this.findAllConnectedComponents();
    }

    public getField() {
        return this.field;
    }

    private populatePlayingField(width: number, height: number) {
        console.log("creating field");
        for (let row = 0; row < width; row++) {
            this.field[row] = [];
            for (let col = 0; col < height; col++) {
                this.addCellContent(row, col);
            }
        }
        this.addBombCounters(this.bombLocations);
    }

    private addCellContent(row: number, col: number) {
        let putBomb: boolean = false;
        putBomb = Math.random() < this.bombFrequency;
        if (putBomb) {
            this.field[row][col] = this.bomb;
            this.bombLocations.push(new Vector2(row, col));
        } else {
            this.field[row][col] = this.empty;
        }
    }

    private addBombCounters(bombLocations: Vector2[]) {
        bombLocations.forEach((bombLoc) => {
            this.updateNeighborsOf(bombLoc);
        });
    }

    private updateNeighborsOf(loc: Vector2) {
        this.neighborVectors.forEach((neighborVector) => {
            let neighbor = loc.add(neighborVector);
            if (!this.outOfRange(neighbor)) {
                if (this.field[neighbor.x][neighbor.y] !== this.bomb) {
                    this.field[neighbor.x][neighbor.y] += 1;
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

    public findAllConnectedComponents() {
        const cellQueue: Queue = new Queue();
        for (let row = 0; row < this.field.length; row++) {
            for (let col = 0; col < this.field[0].length; col++) {
                if (!this.processed[row][col]) {
                    this.processCurrentCell(cellQueue, row, col);
                }
            }
        }
    }

    private processCurrentCell(cellQueue: Queue, row: number, col: number) {
        const currentCellContent = this.field[row][col];
        if (currentCellContent === this.empty) {
            this.connectedSets.push(new Set<string>());
            this.processEmptyCell(cellQueue, new Vector2(row, col));
            while (!cellQueue.isEmpty()) {
                let currentQueueLoc: Vector2 = cellQueue.dequeue();
                this.checkNeighbors(currentQueueLoc, cellQueue);
            }
        } else {
            this.processed[row][col] = true;
        }
    }

    private processEmptyCell(cellQueue: Queue, location: Vector2) {
        cellQueue.enqueue(location);
        this.processed[location.x][location.y] = true;
        const len = this.connectedSets.length;
        this.connectedSets[len - 1].add(location.toString());
    }

    private checkNeighbors(loc: Vector2, cellQueue: Queue) {
        let neighbor: Vector2;
        this.neighborVectors.forEach((neighborVector) => {
            neighbor = loc.add(neighborVector);
            if (!this.outOfRange(neighbor)) {
                if (!this.processed[neighbor.x][neighbor.y]) {
                    if (this.cellIsEmpty(neighbor)) {
                        this.processEmptyCell(cellQueue, neighbor);
                    } else {
                        this.processed[neighbor.x][neighbor.y] = true;
                        const len = this.connectedSets.length;
                        this.connectedSets[len - 1].add(neighbor.toString());
                    }
                } else if (this.processed[neighbor.x][neighbor.y]) {
                    this.addEdgeCell(neighbor);
                }
            }
        });
    }

    private addEdgeCell(currentNeighbor: Vector2) {
        if (this.field[currentNeighbor.x][currentNeighbor.y] > 0) {
            const len = this.connectedSets.length;
            if (!this.connectedSets[len - 1].has(currentNeighbor.toString())) {
                this.connectedSets[len - 1].add(currentNeighbor.toString());
            }
        }
    }

    private cellIsEmpty(currentLoc: Vector2): boolean {
        const { x, y } = currentLoc;
        return this.field[x][y] === this.empty;
    }

    private outOfRange(location: Vector2) {
        return location.outOfRange(this.field.length, this.field[0].length);
    }
}
