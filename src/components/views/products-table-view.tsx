import { FC, useContext, useEffect, useState } from 'react';
import MuiProductsTable from '../tables/mui-products-table';
import { useGetFilteredProductsByTitleQuery, useGetProductsQuery } from '../../redux/api-queries/product-queries';
import { Product } from '../../@types/product';
import Loading from '../shared/loading';
import { TypeSnackBarContext } from '../../@types/types';
import { SnackBarContext } from '../../contexts/snackbar';

interface TableProps {
    searchWord: string,
    setNumberOfProducts: (nr: number)=> void
}
const Table: FC<TableProps> = ({ searchWord, setNumberOfProducts }: TableProps) => {
    const { data: filteredProducts, isLoading: isLoadingFilteredProducts } = useGetFilteredProductsByTitleQuery({title: searchWord});
    const { data, isLoading } = useGetProductsQuery(undefined);
	const [ products, setProducts] = useState<Product[]>([]);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;

    useEffect(()=> {
        data && setProducts(data);
	}, [data]);

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

    return (
        <>
            { isLoading || isLoadingFilteredProducts ? <Loading /> : 
                <div className='view-wrapper'>
                    <MuiProductsTable data={products} />
                </div>
            }
        </>
    )
}

export default Table;