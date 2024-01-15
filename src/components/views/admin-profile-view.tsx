import { FC } from 'react';
import AdminOrders from './inner-components/admin-orders';
import Categories from './inner-components/categories';
import { useGetOrdersQuery } from '../../redux/api-queries/order-queries';
import { useGetCategoriesQuery } from '../../redux/api-queries/category-queries';
import { ProfileProductsPlaceholder } from './inner-components/profile-products-placeholder';

const AdminProfileView: FC= () => {
    const { data: orders} = useGetOrdersQuery({ token: localStorage.getItem('token') || '' });
    const { data: categories } = useGetCategoriesQuery(localStorage.getItem('token') || '');

    return (
        <>
            <ProfileProductsPlaceholder />
            {categories && categories.length>0 && 
                <Categories 
                    categories={categories} 
                />
            }
            {orders && orders.length>0 && 
                <AdminOrders 
                    orders={orders} 
                />
            }
        </>
    );
}

export default AdminProfileView;