export const formatUiPrice = (nr: number | string) => {
    return parseFloat(nr.toString()).toFixed(2);
}