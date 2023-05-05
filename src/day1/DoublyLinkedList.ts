export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        //just as we were in other programming language
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        // NH->H<->(..)
        //new head points to current head
        node.next = this.head;
        // NH<->H
        //current head set new head as prev
        this.head.prev = node;
        //the new head is now the new node
        // NH<->(...)
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        //first attach the new node, second break the old links
        if (idx > this.length) {
            throw new Error("oh no error");
        }
        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        //we need to traverse
        if (this.head) {
            const curr = this.getAt(idx);
            if (curr) {
                const node: Node<T> = { value: item };
                // newN->currN
                node.next = curr;
                // prevCurrN<-newN->currN<->currNNext
                //      ^-------------^
                node.prev = curr.prev;
                // prevCurrN<-newN<->currN<->currNext
                //      |--------------^
                curr.prev = node;
                // prevCurrN<->node<->currN<->(...)
                node.prev!.next = node;
            }
        }
    }
    append(item: T): void {
        this.length++;
        const node: Node<T> = { value: item };

        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        // (...)<->T<-newN
        node.prev = this.tail;
        // (...)<->T<->newN
        this.tail.next = node;
        // (...)<->N<->T
        this.tail = node;
    }

    remove(item: T): T | undefined {
        //we find the ->first<- matching item in the linkedlist
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }
        //No item case
        if (!curr) return undefined;
        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) return undefined;
        return this.removeNode(node);
    }
    private getAt(idx: number): Node<T> | undefined {
        let node: Node<T> | undefined = this.head;
        for (let i = 0; node && i < idx; ++i) {
            node = node.next!;
        }
        return node;
    }
    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            // curr<->currPrev<->next
            //   |----------------^
            node.prev.next = node.next;
        }

        if (node.next) {
            // prev<->current<->next
            //   ^---------------|
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        node.prev = node.next = undefined;
        return node.value;
    }
}

type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

