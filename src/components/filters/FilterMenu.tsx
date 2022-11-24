import React, { useState, useCallback, useRef } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow'
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import Pagination from '../pagination/Pagination'
import { ItemsPerPage } from '../pagination';
import SearchBar from '../SearchBar';

import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addFilter, clearFilters, Filter, removeFilter } from '../../redux/features/filtersSlice';
import { useGetResourceListQuery } from '../../redux/api/gameAPI';

import { OtherType } from '../../features/typeGuards'

interface Props {
    filterType: string;
}

const SelectableMenuItem = ({ name, id, filterType }
    : { name: string, id: number, filterType: string }) => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filters)
    const [selected, setSelected] = useState((filters[filterType] as Filter[]).map((filter: Filter) => filter.id).includes(id));

    const handleClick = () => {
        if (!selected) dispatch(addFilter({ name, id, filterType }))
        else dispatch(removeFilter({ name, id, filterType }))

        setSelected(prev => !prev)
    }

    return (
        <>
            <MenuItem onClick={handleClick} sx={{
                display: 'flex',
            }} disableTouchRipple>
                <Checkbox
                    sx={{ padding: 0, marginRight: 1 }}
                    checked={selected} />
                <Typography
                    fontSize={12}
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'capitalize' }}>
                    {name}
                </Typography>
            </MenuItem>
        </>
    )
}

const MemoMenuItem = React.memo(SelectableMenuItem)

const FilterMenu = ({ filterType }: Props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const filters = useAppSelector(state => state.filters);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(0);

    const { data, isFetching } = useGetResourceListQuery({
        endpoint: filterType,
        page: page + 1,
        pageCount: ItemsPerPage
    })

    const handleToggle = useCallback(() => {
        setOpen(prevOpen => !prevOpen)
    }, [])

    const handleClose = useCallback((event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    }, [anchorRef])

    const handleClearClick = useCallback(() => {
        dispatch(clearFilters(filterType));
    }, [filterType])

    return (
        <div>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                endIcon={open ? <GoChevronUp /> : <GoChevronDown />}
                variant='contained'
                sx={{
                    textTransform: 'capitalize',
                    width: '100%',
                }}
            >
                <Typography
                    flex={1}
                    textAlign='left'
                    textTransform='capitalize'>
                    {filterType}
                </Typography>
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 20, padding: 0 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper sx={{ maxWidth: 270, padding: 1, bgcolor: 'azure' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                        width: '100%',
                                        padding: 1,
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1,
                                        }}>
                                            <Typography fontSize={12}>
                                                {(filters[filterType] as Filter[]).length} selected
                                            </Typography>
                                            <Typography
                                                fontSize={10}
                                                maxHeight={40}
                                                paddingY={1}
                                                sx={{ overflowY: 'hidden', textOverflow: 'ellipsis'}}>
                                                {(filters[filterType] as Filter[]).map(filter => filter.name).join(', ')}
                                            </Typography>
                                        </div>
                                        <Button variant='contained' size='small'
                                            onClick={handleClearClick}>
                                            Clear
                                        </Button>
                                    </Box>
                                    {isFetching ? (<Skeleton animation='wave' variant='rectangular' width='100%' height={250} />) :
                                    data?.results?.map(result => (
                                        <MemoMenuItem
                                            key={result?.id}
                                            name={result?.name}
                                            id={result?.id}
                                            filterType={filterType} />
                                    ))}
                                    {isFetching ? (<Skeleton animation='wave' variant='rectangular' width='100%' height={50} />) :
                                    (<Pagination page={page + 1} setPage={setPage} totalCount={data?.count} />)}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export default FilterMenu;