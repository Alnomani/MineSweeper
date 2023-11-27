export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
    outOfRange(rowMax, colMax) {
        return this.x < 0 || this.y < 0 || this.x >= rowMax || this.y >= colMax;
    }
}
