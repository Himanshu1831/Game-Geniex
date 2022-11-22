import * as React from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { GrSearch, GrMenu } from 'react-icons/gr'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

interface Props {
    toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchAppBar({ toggleDrawer }: Props) {
    const handleDrawerToggle = React.useCallback(() => {
        toggleDrawer(prev => !prev);
    }, []) 

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="open drawer"
                        sx={{ 
                            display: { xs: 'block', md: 'none' },
                            mr: 2 
                        }}
                        onClick={handleDrawerToggle}
                    >
                        <GrMenu />
                    </IconButton>
                    <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, flex: 1}}>
                        Game Store
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <GrSearch />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}