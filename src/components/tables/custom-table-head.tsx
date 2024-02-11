
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: theme.palette.mode === 'light' ? 'rgb(253, 139, 51)' : '#429F42',
    color: 'black',
    fontSize: "16px",
    borderBottom: "1px solid black",
    fontWeight:'900',
    '& td': {
      color: 'black'
    }
  },
}));

const CustomOrderItemsTableHead = styled(TableHead)(({ theme }) => ({
  "& th": {
    backgroundColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#84888d',
    fontSize: "16px",
    borderBottom: "1px solid black",
    color: 'black',
    fontWeight:'900'
  },
}));

export { CustomTableHead, CustomOrderItemsTableHead };
