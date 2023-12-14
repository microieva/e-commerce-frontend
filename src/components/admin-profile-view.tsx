import { FC } from 'react';
import UserOrders from './user-orders';
import Categories from './categories';
import { useDeleteOrdersMutation, useGetOrdersQuery } from '../redux/api-queries/order-queries';
import { useGetCategoriesQuery } from '../redux/api-queries/category-queries';

const AdminProfileView: FC= () => {
    const { data: orders} = useGetOrdersQuery({ token: localStorage.getItem('token') || '' });
    const { data: categories } = useGetCategoriesQuery(localStorage.getItem('token') || '');
    const [ deleteOrders, { data: deletingData, error }] = useDeleteOrdersMutation();

    const handleDeleteAdminOrders = async () => {
        await deleteOrders({ token: localStorage.getItem('token') || ''});
    }
    const handleDeleteCategories = async () => {
        console.log('deleting')
    }

    return (
        <>
            {categories && categories.length>0 && 
                <Categories 
                    categories={categories} 
                    handleDeleteCategories={handleDeleteCategories}
                />
            }
            {!deletingData && orders && orders.length>0 && 
                <UserOrders 
                    orders={orders} 
                    handleDeleteOrders={handleDeleteAdminOrders}
                />
            }
        </>
    );
}

export default AdminProfileView;