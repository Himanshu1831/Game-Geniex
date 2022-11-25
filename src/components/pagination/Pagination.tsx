import { startTransition } from 'react'

import MUIPagination from '@mui/material/Pagination'
import { PaginationProps, ItemsPerPage } from '.';

const Pagination = ({ page, setPage, totalCount }: PaginationProps) => {
    const handleChangePage = (event: unknown, newPage: number) => {
        startTransition(() => {
            setPage(newPage - 1);
        })
    };

    return (
        <MUIPagination 
        count={totalCount ? Math.ceil(totalCount / ItemsPerPage) : -1} 
        page={page} 
        onChange={handleChangePage} 
        showFirstButton 
        showLastButton 
        color='primary'
        boundaryCount={0}
        siblingCount={0}
        sx={{ 
            paddingY: 2, 
            alignSelf: 'center',
            '& .MuiPagination-ul': {
                padding: 0,
            }
        }}/>
    )
}

export default Pagination