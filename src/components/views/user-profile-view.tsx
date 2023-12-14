import { FC } from 'react';
import UserOrders from './inner-components/user-orders';
import { useDeleteUserOrdersMutation, useGetOrdersByUserIdQuery } from '../../redux/api-queries/order-queries';


const UserView: FC<{ userId: string }>= ({ userId }) => {
    const token = localStorage.getItem('token') || ''
    const { data } = useGetOrdersByUserIdQuery({ token, userId });
    const [ deleteUserOrders, {data: deletingData, error, isLoading }] = useDeleteUserOrdersMutation();

    const handleDeleteUserOrders = async () => {  
        await deleteUserOrders({ token: localStorage.getItem('token') || '', userId: userId});
    }

    return (
        <>
            {!deletingData && data && <UserOrders orders={data} handleDeleteOrders={handleDeleteUserOrders}/>}
        </>
    );
}

export default UserView;