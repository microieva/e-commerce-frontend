import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import { useGetFilteredProductsByTitleQuery, useGetProductsQuery } from '../../redux/api-queries/product-queries';

import ProductCard from './inner-components/product-card';
import Pagination from './inner-components/pagination';
import Loading from '../shared/loading';
import { User } from '../../@types/user';
import { Product } from '../../@types/product';
import { TypeSnackBarContext } from '../../@types/types';
import { SnackBarContext } from '../../contexts/snackbar';

interface ViewProps {
  searchWord: string
}

const CardsView = ({ searchWord }: ViewProps) => {
	const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user, isLoading: isLoadingUser } = useGetUserQuery(token);

	const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(user);
	const [ admin, setAdmin ] = useState<boolean>(false);

	const { data, isLoading } = useGetProductsQuery(undefined);
	const { data: filteredProducts, isLoading: isLoadingFilteredProducts } = useGetFilteredProductsByTitleQuery({ title: searchWord});
	const [ products, setProducts] = useState<Product[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(20);
	const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;

	useEffect(()=> {
        data && setProducts(data);
	}, [data]);

	useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        user && setLoggedInUser(user);
		if (user && user.role === 'ADMIN') {
			setAdmin(true);
		}
       
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [user]);

	useEffect(()=>{
		if (!token) {
			setAdmin(false);
		}
	}, [token])

	useEffect(()=>{	
		if (filteredProducts) {
			filteredProducts.length> 0 ?  
				setProducts(filteredProducts)
				:
				setProducts(products);

		}
	}, [searchWord, filteredProducts])

	const handlePageChange = (newPage: number, newItemsPerPage: number) => {
    	setCurrentPage(newPage);
		setItemsPerPage(newItemsPerPage);
  	};
	const startIndex = (currentPage - 1) * itemsPerPage;
  	const endIndex = startIndex + itemsPerPage;
  	const currentProducts = products.length > itemsPerPage ? products.slice(startIndex, endIndex) : products;

	return (
		<>
			{ isLoading || isLoadingFilteredProducts || isLoadingUser ? <Loading /> :
				<div className="cards-container">
					<div className="cards-view-wrapper">
						{currentProducts.length > 0 && currentProducts.map((product: Product, i) => {
							return (
								<div style={{position: "relative"}} key={i}>
									<Link style={{textDecoration: "none", color: "black"}} to={`/products/${product._id}`}>
										<ProductCard key={product._id} product={product} admin={admin}/>
									</Link>
								</div>
							);
						})}
					</div> 
					<div className="pagination-container">
						<Pagination
							itemsPerPage={[10, 20, 100]}
							totalItems={products.length}
							onPageChange={handlePageChange}
							startIndex={startIndex}
							endIndex={currentProducts.length < itemsPerPage ? products.length : endIndex}
						/>
					</div>
					<Outlet />
				</div>
			}
		</>
	)
};

export default CardsView;