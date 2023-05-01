//(N+1)*(N/2) tells the sum of numbers between a range
export default function bubble_sort(arr: number[]): void {
    let unsortedElements = arr.length;
    while (unsortedElements > 0) {
        for (let i = 0; i < unsortedElements - 1; i++) {
            let buffer: number;
            if (arr[i] > arr[i + 1]) {
                buffer = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = buffer;
            }
        }
        unsortedElements--;
    }
}

