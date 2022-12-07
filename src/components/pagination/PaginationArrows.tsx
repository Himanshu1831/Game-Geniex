import React, { useCallback, startTransition } from 'react'

import IconButton from '@mui/material/IconButton'

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import { ItemsPerPage } from '.'

interface PaginationArrowsProps {
    page: number, 
    totalCount?: number | undefined,
    onNext: () => void;
    onPrevious: () => void;
}

const PaginationArrows = ({ page, onPrevious, onNext, totalCount }: PaginationArrowsProps) => {
    const inactive = (typeof totalCount === 'number' && page * ItemsPerPage >= totalCount);

    return (
        <>
            <IconButton 
            data-testid='previousBtn'
            onClick={onPrevious} 
            sx={{ position: 'fixed', top: '50%'}} 
            disableRipple>
                <BsArrowLeftCircleFill className={`pagination-arrow ${page === 0 ? 'inactive' : ''}`} />
            </IconButton>
            <IconButton 
            data-testid='nextBtn'
            onClick={onNext} 
            sx={{ 
                position: 'fixed', 
                top: '50%', 
                alignSelf: 'flex-end'
            }} 
            disabled={inactive}
            disableRipple>
                <BsArrowRightCircleFill className={`pagination-arrow 
                ${inactive ? 'inactive' : ''}`}/>
            </IconButton>
            
        </>
    )
}

export default PaginationArrows