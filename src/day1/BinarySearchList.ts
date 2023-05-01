export default function bs_list(haystack: number[], needle: number): boolean {
    let highestValue: number;
    let lowestValue: number;
    let half: number;
    let order: order;
    if (haystack.length === 0) return false;
    if (haystack[haystack.length - 1] > haystack[0]) {
        highestValue = haystack.length;
        lowestValue = 0;
        order = "ASC";
    } else {
        highestValue = -1;
        lowestValue = haystack.length - 1;
        order = "DESC";
    }

    do {
        half = calcHalf(lowestValue, highestValue, order);
        if (haystack[half] === needle) {
            return true;
        } else if (needle > haystack[half]) {
            if (order === "ASC") {
                lowestValue = half + 1;
            } else {
                lowestValue = half - 1;
            }
        } else if (needle < haystack[half]) {
            highestValue = half;
        }
    } while (
        order === "ASC"
            ? lowestValue < highestValue
            : highestValue < lowestValue
    );
    return false;
    function calcHalf(low: number, high: number, order: order) {
        if (order === "ASC") {
            return Math.floor(low + (high - low) / 2);
        }
        return Math.ceil(high + (low - high) / 2);
    }
}
type order = "ASC" | "DESC";
