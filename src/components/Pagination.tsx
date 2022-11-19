import React, { startTransition } from 'react'

import { TablePagination } from '@mui/material'

interface PaginationProps {
    page: number, 
    rowsPerPage: number, 
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination = ({ page, rowsPerPage, setPage, setRowsPerPage }: PaginationProps) => {
    const handleChangePage = (event: unknown, newPage: number) => {
        startTransition(() => {
            setPage(newPage);
        })
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setRowsPerPage(parseInt(event.target.value, 10));
        })
    };

    return (
        <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 40]}
        component='div'
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}//0-based
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    )
}

export default Pagination