import { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography';

interface Props {
    name: string; 
    id: number; 
    onSelect: (name: string, id: number, isSelectedBefore: boolean) => void;
    isSelected: boolean;
}

const SelectableMenuItem = ({ name, id, isSelected, onSelect }: Props) => {
    const handleSelect = () => {
        onSelect(name, id, isSelected);
    }

    return (
        <>
            <MenuItem 
            aria-label='menu-item'
            onClick={handleSelect} 
            sx={{
                display: 'flex',
            }} 
            disableTouchRipple
            >
                <Checkbox
                    sx={{ 
                        padding: 0, 
                        marginRight: 1 
                    }}
                    checked={isSelected} />
                <Typography
                    fontSize={12}
                    sx={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        textTransform: 'capitalize' 
                    }}>
                    {name}
                </Typography>
            </MenuItem>
        </>
    )
}

export default SelectableMenuItem
