import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import { useGetFilteredProductsByTitleQuery, useGetProductsQuery } from '../../redux/api-queries/product-queries';
import ProductCard from './inner-components/product-card';
import Pagination from './inner-components/pagination';
import Loading from '../shared/loading';
import { Product } from '../../@types/product';

interface ViewProps {
  searchWord: string,
  setNumberOfProducts: (nr: number)=> void
}

const CardsView = ({ searchWord, setNumberOfProducts }: ViewProps) => {
	const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user, isLoading: isLoadingUser } = useGetUserQuery(token);
	const [ admin, setAdmin ] = useState<boolean>(false);

	const { data, isLoading } = useGetProductsQuery(undefined);
	const { data: filteredProducts, isLoading: isLoadingFilteredProducts } = useGetFilteredProductsByTitleQuery({ title: searchWord});
	const [ products, setProducts] = useState<Product[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(20);

	useEffect(()=> {
        data && setProducts(data);
	}, [data]);

	useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
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
			if (searchWord && filteredProducts.length===0) {
				data && setProducts(data);
			} 
			else {
				setProducts(filteredProducts);
			}
			setNumberOfProducts(filteredProducts.length);
		}
	}, [searchWord, filteredProducts]);


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
			<>
				<div className="cards-view-wrapper">
					{currentProducts.length > 0 && currentProducts.map((product: Product, i) => {
						return (
							<div style={{position: "relative", margin:"auto"}} key={i}>
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
			</>
			}
		</>
	)
};

export default CardsView;