import { FC } from 'react';
import UserOrders from './inner-components/user-orders';
import { useGetOrdersByUserIdQuery } from '../../redux/api-queries/order-queries';


const UserView: FC<{ userId: string }>= ({ userId }) => {
    const token = localStorage.getItem('token') || ''
    const { data: orders } = useGetOrdersByUserIdQuery({ token, userId });

    return (
        <>
            { orders && <UserOrders orders={orders}/>}
        </>
    );
}

export default UserView;