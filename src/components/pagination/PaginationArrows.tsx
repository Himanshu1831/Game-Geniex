import React, { useState, useEffect, useCallback, startTransition } from 'react'

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
            setPage(page - 1);
        })
    }, [])

    const handleNext = useCallback(() => {
        startTransition(() => {
            if (!totalGameCount) return;
            if (page * rowsPerPage >= totalGameCount) return;
            setPage(page + 1);
        })
    }, [])

    return (
        <>
            <BsArrowLeftCircleFill className={`pagination-arrow ${page === 0 ? 'inactive' : ''}`}
            onClick={handlePrevious}/>
            <BsArrowRightCircleFill className={`pagination-arrow 
            ${typeof totalGameCount === 'number' && (page * rowsPerPage >= totalGameCount) ? 'inactive' : ''}`}
            onClick={handleNext}/>
        </>
    )
}

export default PaginationArrows