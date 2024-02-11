import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { visuallyHidden } from '@mui/utils';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TableSortLabel,
    Box
} from '@mui/material';

import { CustomTableHead } from './custom-table-head';
import { getSorted } from '../../redux/selectors/getSorted';
import CartActions from '../shared/cart-actions';
import { Product } from '../../@types/product';
import { TableColumn } from '../../@types/table';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import AdminActions from '../shared/admin-actions';
import Loading from '../shared/loading';
import { formatUiPrice } from '../../shared/formatUiPrice';

interface TableProps {
    data: Product[],
}

const MuiProductsTable = ({ data }: TableProps) => {

    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user, isLoading } = useGetUserQuery(token);
    const [ admin, setAdmin ] = useState<boolean>(false);
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    type Order = 'asc' | 'desc';
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Product>('title');
    const [rows, setRows] = useState<Product[]>(data);

    const columns: readonly TableColumn[] = [
        { 
            id: 'title', 
            label: 'Title'
        },
        {
            id: 'price',
            label: 'Price',
            align: 'right',
            render: (row: Product) => formatUiPrice(row.price)+ " €"
        },
        {
            id: 'category',
            label: 'Category',
            align: 'right',
            render: (row: Product) => row.category.name,
        },
    ];
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSort = useCallback((property: keyof Product)  => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);   
    }, [order, orderBy]);

    useEffect(()=> {
        const sorted = getSorted(data, order, orderBy);
        setRows(sorted);
    }, [data, order, orderBy, handleSort]);


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

    if (isLoading) {
        return <Loading />
    }
    
    return (
        <Paper sx={{ width: 'inherit', overflow: 'hidden', margin: "auto", boxShadow:"none", border: "1px solid darkgray", borderRadius:"7px"}}>
            <TableContainer sx={{ maxHeight: "40rem" }}>
                <Table stickyHeader aria-label="sticky table">
                    <CustomTableHead sx={{ "&thead": {top: "0", position: "sticky"} }}>
                        <TableRow>
                            {columns.map((column: TableColumn) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }} 
                                >   
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={()=> handleSort(column.id)}
                                    >
                                        {column.label}
                                        {orderBy === column.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                        ) : null
                                        }
                                    </TableSortLabel>
                                </TableCell>
                                ))}
                                <TableCell colSpan={1} style={{ minWidth: 50 }}></TableCell>
                            </TableRow>
                        </CustomTableHead>
                        <TableBody sx={{ "& tbody": {height: ""}}}>
                        { rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: Product) => {
                                return (   
                                    <TableRow 
                                        hover
                                        role="checkbox" 
                                        tabIndex={-1} 
                                        key={row._id} 
                                        sx={{
                                            "& td": {padding: "0 1rem"},
                                            "& td:hover": {
                                                cursor: "pointer"
                                            }
                                        }}
                                    >    
                                    {columns.map((column: TableColumn, i) => {
                                        const value = column.render ? column.render(row) : row[column.id].toString();
                                        return (
                                            <TableCell key={i+column.id} align={column.align}>
                                                <Link style={{textDecoration: "none" }} to={`/products/${row._id}`}>
                                                    {value}
                                                </Link>
                                            </TableCell>    
                                            );
                                        })}
                                        { admin ?
                                            <TableCell>
                                                <AdminActions product={row}/>
                                            </TableCell>
                                        :
                                            <TableCell>
                                                <CartActions product={row}/>
                                            </TableCell>
                                        }
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Outlet />
            </Paper>
        );
    }

export default MuiProductsTable;