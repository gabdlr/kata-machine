export default class Stack<T> {
    private _length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this._length = 0;
    }

    get length() {
        return this._length;
    }

    push(item: T): void {
        const node: Node<T> = { value: item };
        this._length++;
        if (this.head === undefined) {
            this.head = node;
            return;
        }
        //point new head node to current head
        node.previous = this.head;
        //point head to new head node
        this.head = node;
    }

    pop(): T | undefined {
        this._length = Math.max(0, this._length - 1);
        if (this._length === 0) {
            const head = this.head;
            this.head = undefined;
            return head?.value;
        }
        const head = this.head;
        this.head = this.head?.previous;
        return head?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

type Node<T> = {
    value: T;
    previous?: Node<T>;
};

