import { Product } from "../../@types/product";

export const getSorted = (
    data: Product[],
    order: 'asc' | 'desc',
    orderBy: keyof Product
) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        let valueA;
        let valueB;

    if (orderBy !== 'category') {
        valueA = a[orderBy];
        valueB = b[orderBy];
    } else {
        valueA = a[orderBy]._id; // originally was type number - changed to string
        valueB = b[orderBy]._id;
    }
    if (valueA && valueB) {
        if (order === 'asc' ) {
            if (valueA < valueB) {
                return -1;
            }
            if (valueA > valueB) {
                return 1;
            }
            return 0;
        } else {
            if (valueA > valueB) {
                return -1;
            }
            if (valueA < valueB) {
                return 1;
            }
            return 0;
        }
        } else {
            return 0
        }
    });

    return sortedData;
};
