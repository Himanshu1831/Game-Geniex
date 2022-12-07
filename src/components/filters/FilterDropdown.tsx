import React, { useState, useCallback, useRef } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go'

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow'
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import FilterMenuContent from './FilterMenuContent';
import { MenuList } from '@mui/material';
import { Filter, Filters } from '../../utils/hooks/useGames';

interface Props {
    filterType: string;
    filters: Filters,
    onManageFilters: (filters: Filter[], filterType: string) => void;
    onClear: (filterType: string) => void;
}

const FilterDropdown = ({ filterType, filters, onManageFilters, onClear }: Props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

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
                        <Paper 
                        sx={{ 
                            width: 300, 
                            padding: 1, 
                            bgcolor: 'azure' 
                        }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                aria-label='filter-menu'
                                autoFocusItem={open}
                                id='composition-menu'
                                aria-labelledby='composition-button'
                                sx={{ padding: 1 }}>
                                    <FilterMenuContent 
                                        filters={filters}
                                        filterType={filterType} 
                                        onManageFilters={onManageFilters}
                                        onClear={onClear} />
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export default FilterDropdown;