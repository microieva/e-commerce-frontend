import { FC } from 'react';
import AdminOrders from './inner-components/admin-orders';
import Categories from './inner-components/categories';
import { useDeleteOrdersMutation, useGetOrdersQuery } from '../../redux/api-queries/order-queries';
import { useGetCategoriesQuery } from '../../redux/api-queries/category-queries';
import { useNavigate } from 'react-router-dom';
import { ProfileProductsPlaceholder } from './inner-components/profile-products-placeholder';

const AdminProfileView: FC= () => {
    const { data: orders} = useGetOrdersQuery({ token: localStorage.getItem('token') || '' });
    const { data: categories } = useGetCategoriesQuery(localStorage.getItem('token') || '');
    const [ deleteOrders, { data: deletingData, error }] = useDeleteOrdersMutation();
    //const [ deletecategories, { data: deletingcategories }] = useDeleteCategoriesMutation();
    const navigate = useNavigate();

    const handleDeleteAdminOrders = async () => {
        await deleteOrders({ token: localStorage.getItem('token') || ''});
    }
    const handleDeleteCategories = async () => {
        console.log('deleting all categories disabled for now')
        //await deleteCategories({token: localStorage.getItem('token') || ''}})
    }
    const handleCreateProduct = () => {
        navigate('/products/new');
    }

    return (
        <>
            <ProfileProductsPlaceholder />
            {categories && categories.length>0 && 
                <Categories 
                    categories={categories} 
                    handleDeleteCategories={handleDeleteCategories}
                />
            }
            {!deletingData && orders && orders.length>0 && 
                <AdminOrders 
                    orders={orders} 
                    handleDeleteOrders={handleDeleteAdminOrders}
                />
            }
        </>
    );
}

export default AdminProfileView;