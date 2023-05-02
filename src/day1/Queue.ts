export default class Queue<T> {
    private _length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this._length = 0;
    }

    get length() {
        return this._length;
    }

    enqueue(item: T): void {
        this._length++;
        const node: Node<T> = { value: item };
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        //we make current tail point to the new node
        this.tail.next = node;
        //we set the new node as tail
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) return undefined;
        this._length--;
        const head = this.head;
        //switch head to next node
        this.head = this.head.next;
        //free operation, just for demonstration purposes as javascript is gc
        head.next = undefined;
        if (this._length === 0) this.tail = undefined;
        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

type Node<T> = {
    value: T;
    next?: Node<T>;
};

