import React, { useCallback, startTransition } from 'react'

import IconButton from '@mui/material/IconButton'

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import { PaginationProps, ItemsPerPage } from '.'

interface Props extends PaginationProps {
    readonly rowsPerPage?: number;
}

const PaginationArrows = ({ page, setPage, totalCount, rowsPerPage }: Props) => {
    const handlePrevious = useCallback(() => {
        startTransition(() => {
            if (page === 0) return;
            setPage(prev => prev - 1);
        })
    }, [page])

    const handleNext = useCallback(() => {
        startTransition(() => {
            if (!(totalCount || rowsPerPage)) return;
            if (rowsPerPage && page * ItemsPerPage >= rowsPerPage) return;  
            if (totalCount && page * ItemsPerPage >= totalCount) return;
            setPage(prev => prev + 1);
        })
    }, [page, totalCount])

    const inactive = (rowsPerPage && page * ItemsPerPage >= rowsPerPage) || 
    (totalCount && page * ItemsPerPage >= totalCount);

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