import { FC } from 'react';
import UserOrders from './user-orders';
import { useDeleteOrdersMutation, useGetOrdersQuery } from '../redux/api-queries/order-queries';

const AdminView: FC= () => {
    const { data: orders} = useGetOrdersQuery({ token: localStorage.getItem('token') || '' });
    const [ deleteOrders, { data: deletingData, error }] = useDeleteOrdersMutation();

    const handleDeleteAdminOrders = async () => {
        await deleteOrders({ token: localStorage.getItem('token') || ''});
    }
    
    return (
        <>
            {!deletingData && orders && <UserOrders orders={orders} handleDeleteOrders={handleDeleteAdminOrders}/>}
        </>
    );
}

export default AdminView;