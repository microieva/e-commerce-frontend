import { FC, useEffect, useState } from 'react';
import MuiProductsTable from './mui-products-table';
import { useGetFilteredProductsByTitleQuery } from '../redux/api-queries/product-queries';
import { Product } from '../@types/product';
import Loading from './loading';

interface TableProps {
    searchWord: string
}
const Table: FC<TableProps> = ({ searchWord }: TableProps) => {
    const { data: filteredD, isLoading } = useGetFilteredProductsByTitleQuery(searchWord);
	const [ products, setProducts] = useState<Product[]>([]);
	const filteredData = filteredD && 'data' in filteredD ? filteredD.data : [];

    useEffect(()=>{	
		filteredData && setProducts(filteredData as Product[]);
	}, [searchWord, filteredD])

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