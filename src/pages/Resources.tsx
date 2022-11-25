import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { BsInfoCircleFill } from 'react-icons/bs';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

import Cards from '../components/cards/Cards';
import InfoCard from '../components/cards/InfoCard';
import PaginationArrows from '../components/pagination/PaginationArrows';
import Pagination from '../components/pagination/Pagination';

import { useGetResourceListQuery } from '../redux/api/gameAPI'
import { ItemsPerPage } from '../components/pagination';
import { useAppSelector } from '../features/hooks';

const Resources = () => {
    const { resource } = useParams();
    const [page, setPage] = useState(0);
    const { data, isFetching, error } = useGetResourceListQuery({ 
        page: page + 1, 
        pageCount: ItemsPerPage, 
        endpoint: resource as string,
    });

    const search = useAppSelector(state => state.app.search);
    const searchResults = data?.results?.filter(result => result?.name?.toLowerCase().includes(search));

    return (
        <Box sx={{
        width: '100%', 
        padding: 1, 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        gap: 1,
        position: 'relative'
        }}>
            <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', width: '100%', gap: 0.5 }}>
                <Typography variant='h6' sx={{ textTransform: 'capitalize' }}>{resource}</Typography>
                <Typography 
                variant='body2'
                sx={{ display: 'flex', width: '100%', gap: 0.5, alignItems: 'center' }}>
                    <BsInfoCircleFill />
                    Select cards to see games with those {resource}
                </Typography>
            </Box>
            <Typography variant='body2' alignSelf='center' marginBottom={1.5}>
                {isFetching ? 'Loading...' : `${(search ? searchResults?.length : data?.count) || 0} ${resource} found`}
            </Typography>
            <Divider />
            <Cards results={search ? searchResults : data?.results} isFetching={isFetching} element={InfoCard} />
            <Pagination page={page + 1} setPage={setPage} totalCount={data?.count} />
            <PaginationArrows page={page} setPage={setPage} totalCount={data?.count} />
        </Box>
    )
}

export default Resources