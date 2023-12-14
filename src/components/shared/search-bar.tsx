import { FC } from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { SearchBarProps } from '../../@types/types';


const SearchBar: FC<SearchBarProps> = ({ onSearchInputChange }: SearchBarProps) => {

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Products"
                inputProps={{ 'aria-label': 'search products by name' }}
                //value={searchTerm}
                onChange={onSearchInputChange}
                type="text"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search" 
                //onClick={() => handleClick()}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
