import React, { useCallback, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import { useAppSelector, useAppDispatch } from '../../features/hooks';
import { clearFilters, Filter } from '../../redux/features/filtersSlice';

import Pagination from '../pagination/Pagination';
import SelectableMenuItem from './SelectableMenuItem';
import { useGetResourceListQuery } from '../../redux/api/gameAPI';
import { ItemsPerPage } from '../pagination';

interface Props {
    filterType: string;
}

const FilterHeader = ({ filterType }: Props) => {
    const filters = useAppSelector(state => state.filters);
    const dispatch = useAppDispatch();

    const handleClearClick = useCallback(() => {
        dispatch(clearFilters(filterType));
    }, [filterType])

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            width: '100%',
            padding: 1,
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
            }}>
                <Typography fontSize={12}>
                    {(filters[filterType] as Filter[]).length} selected
                </Typography>
                <Typography
                    fontSize={10}
                    maxHeight={40}
                    paddingY={1}
                    sx={{ overflowY: 'hidden', textOverflow: 'ellipsis' }}>
                    {(filters[filterType] as Filter[]).map(filter => filter.name).join(', ')}
                </Typography>
            </div>
            <Button variant='contained' size='small'
                onClick={handleClearClick}>
                Clear
            </Button>
        </Box>
    )
}

const FilterMenuContent = ({ filterType }: { filterType : string }) => {
    const [page, setPage] = useState(0);

    const { data, isFetching } = useGetResourceListQuery({
        endpoint: filterType,
        page: page + 1,
        pageCount: ItemsPerPage
    })
    
    const MemoMenuItem = React.memo(SelectableMenuItem);

    return (
        <>
            <FilterHeader filterType={filterType} />
            {isFetching ?
                Array.from(Array(ItemsPerPage).keys()).map((index) => (
                    <Skeleton key={index} animation='wave' variant='rectangular' width='100%' height={30}
                    sx={{ marginBottom: 1 }} />
                )) :
                data?.results?.map(result => (
                    <MemoMenuItem
                        key={result?.id}
                        name={result?.name}
                        id={result?.id}
                        filterType={filterType} />
                ))}
            {isFetching ? (<Skeleton animation='wave' variant='rectangular' width='100%' height={50} />) :
                (<Pagination page={page + 1} setPage={setPage} totalCount={data?.count} />)}
        </>
    )
}

export default FilterMenuContent