import React, { useState, useCallback } from 'react';

import { GoChevronUp, GoChevronDown } from 'react-icons/go'

import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useGetResourceListQuery } from '../../redux/api/gameAPI';
import { alpha, Checkbox, ListItemText, styled, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addFilter, addFilters, clearFilters, Filter, removeFilter } from '../../redux/features/filtersSlice';
import Pagination from '../pagination/Pagination'
import { ItemsPerPage } from '../pagination';
import SearchBar from '../SearchBar';

interface Props {
    filterType: string;
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            `rgb(255, 255, 255) 0px 0px 0px 0px, 
            rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, 
            rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, 
            rgba(0, 0, 0, 0.05) 0px 4px 6px -2px`,
        '& .MuiMenu-list': {
            padding: '4px 0',
            maxHeight: '200px',
            overflow: 'auto'
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
  
const SelectableMenuItem = ({ name, id, filterType }: { name: string, id: string, filterType: string }) => {
    const filters = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState(false);

    const handleClick = useCallback(() => {
        if (!selected) dispatch(addFilter({ name, id, filterType }))
        else dispatch(removeFilter({ name, id, filterType }))

        setSelected(prev => !prev)
    }, [selected])

    return (
        <>
            <MenuItem onClick={handleClick} sx={{
                display: 'flex',
            }}>
                <Checkbox sx={{ padding: 0, marginRight: 1 }} checked={(filters[filterType] as Filter[]).map(filter => filter.name).includes(name)} />
                <ListItemText sx={{ flex: 1 }} primary={name} />
            </MenuItem>
        </>
    )
}

const FilterMenu = ({ filterType }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const filters = useAppSelector(state => state.filters);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const { data , isFetching } = useGetResourceListQuery({
        endpoint: filterType,
        page: page + 1,
        pageCount: ItemsPerPage,
        search,
    })

    const handlePopUpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleAllClick = useCallback(() => {
        dispatch(addFilters({ filterType, 
            names: data?.results?.map(result => result.name),
            ids: data?.results?.map(result => result.id.toString())
        }));
    }, [filterType, data])

    const handleClearClick = useCallback(() => {
        dispatch(clearFilters(filterType));
    }, [filterType])

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [])

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }, []);

    return (
        <>
                <Button
                    id="filter-button"
                    aria-controls={open ? 'filter-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handlePopUpClick}
                    variant='contained'
                    endIcon={open ? <GoChevronUp /> : <GoChevronDown />}
                    sx={{ 
                        textTransform: 'capitalize', 
                        width: '100%', 
                    }}
                >
                    <Typography component='p' sx={{ flex: 1, textAlign: 'left' }}>{filterType}</Typography>
                </Button>
                <StyledMenu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'filter-button',
                    }}
                >
                    <MenuItem sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        width: '100%',
                    }} disableRipple>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}>
                            <Typography fontSize={12}>{(filters[filterType] as string[]).length} selected</Typography>
                            <Typography fontSize={10} maxWidth={150} sx={{ overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                {(filters[filterType] as Filter[]).map(filter => filter.name).join(', ')}
                            </Typography>
                        </div>
                        <Button variant='contained' size='small' 
                            onClick={handleClearClick}>
                                Clear
                        </Button>
                    </MenuItem>
                    <MenuItem disableRipple>
                        <SearchBar search={search} handleChange={handleSearchChange} />
                    </MenuItem>
                    {data?.results?.map(result => (
                        <SelectableMenuItem key={result?.id} name={result?.name} id={result?.id.toString()} filterType={filterType}/>
                    ))}
                    <MenuItem disableRipple>
                        <Pagination page={page + 1} setPage={setPage} totalCount={data?.count} />
                    </MenuItem>
                </StyledMenu>
            </>
    );
}

export default FilterMenu;