import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

import Cards from '../components/cards/Cards';
import InfoCard from '../components/cards/InfoCard';
import PaginationArrows from '../components/pagination/PaginationArrows';
import Pagination from '../components/pagination/Pagination';

import { useGetResourceListQuery } from '../redux/api/gameAPI'

const Resources = () => {
    const { resource } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { data, isFetching, error } = useGetResourceListQuery({ 
        page: page + 1, 
        pageCount: rowsPerPage, 
        endpoint: resource as string  
    });

    return (
        <Box sx={{ width: '100%', 
        padding: 1, 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        gap: 1,
        position: 'relative'
        }}>
            <Typography variant='h6' sx={{ textTransform: 'capitalize', ml: 2}}>{resource}</Typography>
            <Divider />
            <Cards data={data} isFetching={isFetching} rowsPerPage={rowsPerPage} element={InfoCard} />
            <Pagination page={page} rowsPerPage={rowsPerPage} setPage={setPage}
            setRowsPerPage={setRowsPerPage} />
            <PaginationArrows page={page} setPage={setPage} rowsPerPage={rowsPerPage} totalGameCount={data?.count} />
        </Box>
    )
}

export default Resources