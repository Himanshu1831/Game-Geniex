import React, { useCallback, startTransition } from 'react'

import IconButton from '@mui/material/IconButton'

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import { PaginationProps } from '.'

interface Props extends PaginationProps {
    readonly itemsPerPage: number;
}

const PaginationArrows = ({ page, setPage, totalCount, itemsPerPage }: Props) => {
    const handlePrevious = useCallback(() => {
        startTransition(() => {
            if (page === 0) return;
            setPage(prev => prev - 1);
        })
    }, [page])

    const handleNext = useCallback(() => {
        startTransition(() => {
            if (totalCount && ((page + 1) * itemsPerPage < totalCount)) {
                setPage(prev => prev + 1);
            } 
        })
    }, [page, itemsPerPage, totalCount])

    const inactive = (totalCount && page * itemsPerPage >= totalCount);

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
                ${inactive ? 'inactive' : ''}`}/>
            </IconButton>
            
        </>
    )
}

export default PaginationArrows