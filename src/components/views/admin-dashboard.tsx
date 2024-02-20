import { FC } from 'react';
import { useGetOrdersQuery } from '../../redux/api-queries/order-queries';
import { useGetCategoriesQuery } from '../../redux/api-queries/category-queries';
import Orders from './inner-components/orders';
import Categories from './inner-components/categories';
import { ProfileProducts } from './inner-components/profile-products';

const AdminDashboard: FC= () => {
    const { data: orders} = useGetOrdersQuery({ token: localStorage.getItem('token') || '' });
    const { data: categories } = useGetCategoriesQuery(localStorage.getItem('token') || '');

    return (
        <>
            <ProfileProducts />
            {categories && categories.length>0 && 
                <Categories 
                    categories={categories} 
                />
            }
            {orders && orders.length>0 && 
                <Orders 
                    orders={orders} admin={true}
                />
            } 
        </>
    );
}

export default AdminDashboard;