import Queue from "./Queue";
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue<BinaryNode<number>>();
    q.enqueue(head);
    while (q.length) {
        //remove curr item of the queue
        const curr: BinaryNode<number> | undefined = q.deque();
        if (curr?.value === needle) {
            return true;
        }
        //add node children
        if (curr?.left) {
            q.enqueue(curr.left);
        }
        if (curr?.right) {
            q.enqueue(curr.right);
        }
    }
    return false;
}

