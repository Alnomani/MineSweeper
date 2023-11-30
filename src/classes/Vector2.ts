export default class Vector2 {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public add(vector2: Vector2): Vector2 {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
    public outOfRange(rowMax: number, colMax: number): boolean {
        return this.x < 0 || this.y < 0 || this.x >= rowMax || this.y >= colMax;
    }
}
