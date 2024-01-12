import { Order } from "../@types/cart";
import { Product } from "../@types/product";

export const mockOrders: Order[] = [
    {
        _id: "1",
        userId: "2",
        totalPrice: 500,
        createdAt: "1.1.2024 13:00",
        paid: false
    },
    {
        _id: "2",
        userId: "2",
        totalPrice: 400,
        createdAt: "2.1.2024 13:00",
        paid: true
    },
    {
        _id: "3",
        userId: "3",
        totalPrice: 100,
        createdAt: "3.1.2024 13:00",
        paid: true
    },
    {
        _id: "4",
        userId: "3",
        totalPrice: 300,
        createdAt: "4.1.2024 13:00",
        paid: true
    }
]