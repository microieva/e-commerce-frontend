import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { formatUiPrice } from '../../shared/formatUiPrice';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from '@mui/material';

import CartActions from '../shared/cart-actions';
import { CustomCartTableHead } from './custom-table-head';
import { CartColumn } from '../../@types/table';
import { CartItem } from '../../@types/cart';

interface Props {
    data: CartItem[],
    disabled: boolean
}

const MuiTable = ({ data, disabled }: Props) => {
    const [prevCart, setPrevCart] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<CartItem[]>(prevCart);

    useEffect(()=> {
        const updated = data.some((cartItem, index) => { 
            const prevCartItem = prevCart[index];
            return prevCartItem && cartItem.quantity !== prevCartItem.quantity;
        });
        if (updated || data.length !== prevCart.length) {
            setRows(data);
        }
        setPrevCart(data);
    }, [data, prevCart])

    const columns: readonly CartColumn[] = [
        { 
            id: 'title', 
            label: 'Title', 
            //minWidth: 170 
        },
        {
            id: 'price',
            label: 'Price',
            //minWidth: 170,
            align: 'right',
            render: (row: CartItem) => formatUiPrice(row.price)+ " €"
        },
        {
            id: 'category',
            label: 'Category',
            //minWidth: 170,
            align: 'right',
            render: (row: CartItem) => row.category.name
        },
        {
          id: 'quantity',
          label: 'Quantity',
          //minWidth: 170,
          align: 'right'
      },
    ];
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
    
    return (
        <Paper sx={{  overflow: 'hidden', boxShadow:"none", border: "1px solid darkgray", borderRadius:"7px"}}>
            <TableContainer sx={{ maxHeight: "40rem" }}>
                <Table stickyHeader aria-label="sticky table">
                    <CustomCartTableHead sx={{ "&thead": {top: "0", position: "sticky"} }}>
                        <TableRow>
                            {columns.map((column: CartColumn, i) => (
                                <TableCell
                                    key={`${i}-${column.id}`} 
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }} 
                                > 
                                    {column.label}  
                                </TableCell>
                            ))}
                                <TableCell colSpan={1} style={{ minWidth: 50 }}></TableCell>
                            </TableRow>
                        </CustomCartTableHead>
                        <TableBody sx={{ "& tbody": {height: ""}}}>
                        { rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: CartItem, i) => {
                                return (  
                                    <>
                                        {row.quantity > 0 && 
                                            <TableRow 
                                                hover
                                                role="checkbox" 
                                                tabIndex={-1} 
                                                key={`${i}-${row._id}`} 
                                                sx={{
                                                    "& td": {padding: "0 1rem"},
                                                    "& td:hover": {
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >    
                                            {columns.map((column: CartColumn, i) => {
                                                const value = column.render ? column.render(row) : row[column.id].toString();
                                                return (
                                                    <TableCell  key={`${i}`} align={column.align}>
                                                        <Link  
                                                            key={`${i}-${column.id}`}  
                                                            style={{textDecoration: "none", color: "black"}} 
                                                            to={`/products/${row._id}`}
                                                        >
                                                            { value }
                                                        </Link>
                                                    </TableCell>      
                                                    );
                                                })}
                                                <TableCell>
                                                    <CartActions product={row} cartDisabled={disabled}/>
                                                </TableCell>
                                            </TableRow>
                                        }
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    disabled={disabled}
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

export default MuiTable;