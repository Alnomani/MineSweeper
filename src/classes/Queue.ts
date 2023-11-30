import Vector2 from "./Vector2";

interface IObject {
    [indexer: string]: Vector2;
}

export default class Queue {
    items: IObject;
    backIndex: number;
    frontIndex: number;

    constructor() {
        this.items = {};
        this.backIndex = 0;
        this.frontIndex = 0;
    }

    enqueue(item: Vector2) {
        this.items[this.backIndex] = item;
        this.backIndex++;
    }

    dequeue() {
        const item: Vector2 = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }
}
