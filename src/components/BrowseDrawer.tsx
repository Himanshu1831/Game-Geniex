import React, { useCallback, startTransition} from 'react';
import { useNavigate } from 'react-router'

import { GiGamepad, GiPlatform, GiGameConsole } from 'react-icons/gi'
import { SiGamejolt } from 'react-icons/si'
import { AiFillTag, AiOutlineTeam } from 'react-icons/ai'
import { IoStorefront } from 'react-icons/io5'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { styled, useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useAppDispatch } from '../features/hooks';
import { updateSearch } from '../redux/features/appSlice';

const drawerWidth = 240;

const filters = [
    {
        name: 'games',
        icon: <GiGamepad style={{ fontSize: 18 }} />
    }, 
    {
        name: 'genres',
        icon: <SiGamejolt style={{ fontSize: 18 }} />
    
    }, 
    { 
        name: 'tags',
        icon: <AiFillTag style={{ fontSize: 18 }} />
    }, 
    { 
        name: 'developers',
        icon: <AiOutlineTeam style={{ fontSize: 18 }} />
    }, 
    { 
        name: 'creators',
        icon: <AiOutlineTeam style={{ fontSize: 18 }} />
    }, 
    { 
        name: 'platforms',
        icon: <GiPlatform style={{ fontSize: 18 }} />
    }, 
    { 
        name: 'stores',
        icon: <IoStorefront style={{ fontSize: 18 }} />
    }
]

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BrowseDrawer(props: Props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDrawerToggle = useCallback(() => {
        props.setOpen(prev => !prev);
    }, []);

    const handleNavigation = useCallback((text: string) => {
        startTransition(() => {
            dispatch(updateSearch(''));
            navigate(`/${text}`);
            handleDrawerToggle();
        })
    }, []);

    const drawer = (
        <div>
            <DrawerHeader>
                <IconButton>
                    <GiGameConsole />
                </IconButton>
                <Typography sx={{ flex: 1, paddingX: 1 }}>Browse</Typography>
                <IconButton 
                onClick={handleDrawerToggle} 
                sx={{ display: { xs: 'block', sm: 'block', md: 'none' }}}>
                    {theme.direction === 'ltr' ? <GoChevronLeft /> : <GoChevronRight />}
                </IconButton>
                </DrawerHeader>
            <Divider />
            <List>
                {filters.map((filter, index) => (
                    <ListItem key={filter.name} disablePadding>
                        <ListItemButton onClick={() => handleNavigation(filter.name)}>
                            <ListItemIcon>
                                {filter.icon}
                            </ListItemIcon>
                            <ListItemText primary={filter.name} sx={{textTransform: 'capitalize'}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="browse "
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                open={props.open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on open.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}