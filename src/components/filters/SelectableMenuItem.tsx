import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addFilter, Filter, removeFilter } from '../../redux/features/filtersSlice'

interface Props {
    name: string; 
    id: number; 
    filterType: string;
}

const SelectableMenuItem = ({ name, id, filterType }: Props) => {
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

export default SelectableMenuItem
