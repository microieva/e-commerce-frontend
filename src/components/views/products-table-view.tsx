import { FC, useEffect, useState } from 'react';
import MuiProductsTable from '../tables/mui-products-table';
import { useGetFilteredProductsByTitleQuery } from '../../redux/api-queries/product-queries';
import { Product } from '../../@types/product';
import Loading from '../shared/loading';

interface TableProps {
    searchWord: string
}
const Table: FC<TableProps> = ({ searchWord }: TableProps) => {
    const { data, isLoading } = useGetFilteredProductsByTitleQuery(searchWord);
	const [ products, setProducts] = useState<Product[]>([]);

    useEffect(()=>{	
		data && setProducts(data);
	}, [searchWord, data])

    return (
        <>
            { isLoading ? <Loading /> : 
                <div className='table-view'>
                    <MuiProductsTable data={products} />
                </div>
            }
        </>
    )
}

export default Table;