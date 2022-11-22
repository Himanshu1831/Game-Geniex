import React, { useState, useEffect, useCallback, startTransition } from 'react'

import IconButton from '@mui/material/IconButton'

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import { PaginationProps } from '.'

interface Props extends PaginationProps {
    rowsPerPage: number,
    totalGameCount: number | undefined,
}

const PaginationArrows = ({ page, setPage, rowsPerPage, totalGameCount }: Props) => {

    const handlePrevious = useCallback(() => {
        startTransition(() => {
            if (page === 0) return;
            setPage(prev => prev - 1);
        })
    }, [page])

    const handleNext = useCallback(() => {
        startTransition(() => {
            if (!totalGameCount) return;
            if (page * rowsPerPage >= totalGameCount) return;
            setPage(prev => prev + 1);
        })
    }, [page, rowsPerPage, totalGameCount])

    return (
        <>
            <IconButton 
            onClick={handlePrevious} 
            sx={{ position: 'fixed', top: '50%'}} 
            disableRipple>
                <BsArrowLeftCircleFill className={`pagination-arrow ${page === 0 ? 'inactive' : ''}`} />
            </IconButton>
            <IconButton 
            onClick={handleNext} 
            sx={{ position: 'fixed', top: '50%', alignSelf: 'flex-end'}} 
            disableRipple>
                <BsArrowRightCircleFill className={`pagination-arrow 
                ${typeof totalGameCount === 'number' && (page * rowsPerPage >= totalGameCount) ? 'inactive' : ''}`}/>
            </IconButton>
            
        </>
    )
}

export default PaginationArrows