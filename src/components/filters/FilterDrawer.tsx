import React, { useState } from 'react';

import { GoChevronRight } from 'react-icons/go'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList'
import { styled } from '@mui/material/styles';

import FilterMenuContent from './FilterMenuContent';
import { Filter, Filters } from '../../utils/hooks/useGames';

const drawerWidth = 250;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface Props {
    filters: Filters,
    open: boolean;
    handleDrawerToggle: () => void;
    onManageFilters: (filters: Filter[], filterType: string) => void;
    onClear: (filterType: string) => void;
}

const FilterDrawer = ({ 
    filters, 
    open, 
    handleDrawerToggle, 
    onManageFilters, 
    onClear 
}: Props ) => {
    const [menu, setMenu] = useState('main');
    const isFilterType = Object.keys(filters).includes(menu);

    const drawer = (
        <Box 
        component={Paper} 
        sx={{ flex: 1, width: drawerWidth }}>
            <DrawerHeader>
                <Typography 
                sx={{ 
                    flex: 1, 
                    paddingX: 1, 
                    textTransform: 'capitalize' 
                }}>
                    filter by{isFilterType && `: ${menu}`}
                </Typography>
                <IconButton 
                onClick={isFilterType ? () => setMenu('main') : handleDrawerToggle} 
                >
                    <GoChevronRight />
                </IconButton>
            </DrawerHeader>
            <Divider />
            {menu === 'main' ? (
                Object.keys(filters).map((filter: string) => (
                    <ListItem key={filter} disablePadding>
                        <ListItemButton onClick={() => setMenu(filter)}>
                            <ListItemText primary={filter} sx={{textTransform: 'capitalize'}} />
                        </ListItemButton>
                    </ListItem>
                ))
            ) : (
                <MenuList
                autoFocusItem={open}
                id='composition-menu'
                aria-labelledby='composition-button'
                sx={{ padding: 1 }}>
                    <FilterMenuContent 
                        filterType={menu} 
                        filters={filters} 
                        onManageFilters={onManageFilters}
                        onClear={onClear} />
                </MenuList>
            )}
        </Box>
    );

    return (
        <Box
            sx={{ width: drawerWidth, display: 'flex', flexDirection: 'column', height: '100%' }}
            aria-label="filter drawer"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                anchor='right'
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on open.
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default FilterDrawer