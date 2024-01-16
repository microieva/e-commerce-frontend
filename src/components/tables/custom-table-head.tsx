import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';

const CustomProductsTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: 'rgb(253, 139, 51)',
    fontSize: "16px",
    borderBottom: "1px solid black"
  },
}));

const CustomCartTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: 'rgb(253, 139, 51)',
    fontSize: "16px",
    borderBottom: "1px solid black",
  },
}));

const CustomOrderItemsTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: '#e0e0e0',
    fontSize: "16px",
    borderBottom: "1px solid black",
  },
}));

export { CustomProductsTableHead, CustomCartTableHead, CustomOrderItemsTableHead };
