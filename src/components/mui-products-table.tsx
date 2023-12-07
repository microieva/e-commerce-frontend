import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
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

import { CustomProductsTableHead } from './custom-table-head';
import { getSorted } from '../redux/selectors/getSorted';
import CartActions from './cart-actions';
import { Product } from '../@types/product';
import { TableColumn } from '../@types/table';
import { TypeUserContext } from '../@types/types';
import { UserContext } from '../contexts/user';

interface TableProps {
    data: Product[],
}

const MuiProductsTable = ({ data }: TableProps) => {
    const { user } = useContext(UserContext) as TypeUserContext;
    const [ admin, setAdmin ] = useState<boolean>(false);
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    type Order = 'asc' | 'desc';
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Product>('title');
    const [rows, setRows] = useState<Product[]>(data);

    const columns: readonly TableColumn[] = [
        { id: 'title', label: 'Title', minWidth: 170 },
        {
            id: 'price',
            label: 'Price',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'category',
            label: 'Category',
            minWidth: 170,
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

    useEffect(()=> {
        user && user.role === 'ADMIN' ? setAdmin(true) : setAdmin(false);
    }, [user])
    
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: "40rem" }}>
                <Table stickyHeader aria-label="sticky table">
                    <CustomProductsTableHead sx={{ "&thead": {top: "0", position: "sticky"} }}>
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
                                {(!user || !admin) && <TableCell colSpan={1} style={{ minWidth: 50 }}></TableCell>}
                            </TableRow>
                        </CustomProductsTableHead>
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
                                            "& td": {padding: admin ? "1rem 1rem" : "0 1rem"},
                                            "& td:hover": {
                                                cursor: "pointer"
                                            }
                                        }}
                                    >    
                                    {columns.map((column: TableColumn) => {
                                        const value = column.render ? column.render(row) : row[column.id].toString();
                                       
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <Link style={{textDecoration: "none", color: "black"}} to={`/products/${row._id}`}>
                                                    {value}
                                                </Link>
                                            </TableCell>    
                                            );
                                        })}
                                        {(!user || !admin) && 
                                        <TableCell>
                                            <CartActions product={row}/>
                                        </TableCell>}
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