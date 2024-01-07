export const useUiPrice = (nr: number | string) => {
    return parseFloat(nr.toString()).toFixed(2);
}