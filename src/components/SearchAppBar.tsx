import React, { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';

interface Props {
    title?: string;
    search: string; 
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const SearchAppBar = ({ title, search, handleChange }: Props) => (
    <Box sx={{ width: '100%' }}>
        <AppBar position="static">
            <Toolbar>
                {title && (<Typography variant='h6' sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, flex: 1 }}>
                    {title}
                </Typography>)}
                <SearchBar search={search} handleChange={handleChange} />
            </Toolbar>
        </AppBar>
    </Box>
)

export default SearchAppBar