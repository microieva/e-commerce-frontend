import { Order } from "../@types/cart";
import { Product } from "../@types/product";

interface Item {
    _id: string,
    orderId: string,
    productId: string,
    quantity: number
}

export const mockOrderItems: Item[] = [
    {
        _id: "1",
        orderId: "1",
        productId: "8",
        quantity: 1
    },
    {
        _id: "2",
        orderId: "1",
        productId: "9",
        quantity: 2
    },
    {
        _id: "3",
        orderId: "2",
        productId: "8",
        quantity: 1
    },
    {
        _id: "4",
        orderId: "2",
        productId: "9",
        quantity: 1
    },
    {
        _id: "3",
        orderId: "3",
        productId: "8",
        quantity: 1
    },
    {
        _id: "4",
        orderId: "4",
        productId: "10",
        quantity: 1
    },
]