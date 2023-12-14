import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';

const CustomProductsTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: 'aquamarine',
    fontSize: "16px",
    borderBottom: "1px solid black",
  },
}));

const CustomCartTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: 'orange',
    fontSize: "16px",
    borderBottom: "1px solid black",
  },
}));

export { CustomProductsTableHead, CustomCartTableHead };
