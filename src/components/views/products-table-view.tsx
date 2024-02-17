import { FC, useContext, useEffect, useState } from 'react';
import MuiProductsTable from '../tables/mui-products-table';
import { useGetFilteredProductsByTitleQuery, useGetProductsQuery } from '../../redux/api-queries/product-queries';
import { Product } from '../../@types/product';
import Loading from '../shared/loading';
import { TypeSnackBarContext } from '../../@types/types';
import { SnackBarContext } from '../../contexts/snackbar';

interface TableProps {
    searchWord: string
}
const Table: FC<TableProps> = ({ searchWord }: TableProps) => {
    const { data: filteredProducts, isLoading: isLoadingFilteredProducts } = useGetFilteredProductsByTitleQuery({title: searchWord});
    const { data, isLoading } = useGetProductsQuery(undefined);
	const [ products, setProducts] = useState<Product[]>([]);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;

    useEffect(()=> {
        data && setProducts(data);
	}, [data]);

    useEffect(()=>{	
	    filteredProducts && setProducts(filteredProducts);
	}, [searchWord, filteredProducts])

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