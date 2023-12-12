import { 	useEffect, useState } from 'react';

import { Link, Outlet } from 'react-router-dom';
import { useGetFilteredProductsByTitleQuery } from '../redux/api-queries/product-queries';
import ProductCard from './product-card';
import Pagination from './pagination';
import { Product } from '../@types/product';
import Loading from './loading';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import { User } from '../@types/user';

interface ViewProps {
  searchWord: string
}

const CardsView = ({ searchWord }: ViewProps) => {
	const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);

	const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(user);
	const [ admin, setAdmin ] = useState<boolean>(false);

	const { data, isLoading } = useGetFilteredProductsByTitleQuery(searchWord);
	const [ products, setProducts] = useState<Product[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(20);

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
		data && setProducts(data);
	}, [searchWord, data])

	const handlePageChange = (newPage: number, newItemsPerPage: number) => {
    	setCurrentPage(newPage);
		setItemsPerPage(newItemsPerPage);
  	};
	const startIndex = (currentPage - 1) * itemsPerPage;
  	const endIndex = startIndex + itemsPerPage;
  	const currentProducts = products.length > itemsPerPage ? products.slice(startIndex, endIndex) : products;

	return (
		<>
			{ isLoading ? <Loading /> :
				<div className="cards-container">
					<div className="cards-view-wrapper">
						{currentProducts.length > 0 && currentProducts.map((product: Product, i) => {
							return (
								<Link key={i} style={{textDecoration: "none", color: "black"}} to={`/products/${product._id}`}>
									<ProductCard key={product._id} product={product} admin={admin}/>
								</Link>
							);
						})}
					</div> 
					<div className="pagination-container">
						<Pagination
							itemsPerPage={[10, 20]}
							totalItems={products.length}
							onPageChange={handlePageChange}
							startIndex={startIndex}
							endIndex={currentProducts.length < itemsPerPage ? currentProducts.length : endIndex}
						/>
					</div>
					<Outlet />
				</div>
			}
		</>
	)
};

export default CardsView;