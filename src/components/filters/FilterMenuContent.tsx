import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import SelectableMenuItem from './SelectableMenuItem'
import { ItemsPerPage } from '../pagination';
import { Filter, Filters } from '../../utils/hooks/useGames';
import useGameElements from '../../utils/hooks/useGameElements';
import Pagination from '@mui/material/Pagination';

interface Props {
    filterType: string;
    filters: Filters,
}

interface HeaderProps extends Props {
    onClear: () => void;
}

interface MenuProps extends Props {
    onManageFilters: (filters: Filter[], filterType: string) => void;
    onClear: (filterType: string) => void;
}

export const FilterHeader = ({ filterType, filters, onClear }: HeaderProps) => {
    return (
        <Box 
        aria-label='header'
        sx={{
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
            <Button 
                variant='contained' 
                size='small'
                onClick={onClear}
            >
                Clear
            </Button>
        </Box>
    )
}

const FilterMenuContent = ({ filterType, filters, onManageFilters, onClear }: MenuProps) => {
    const { 
        data, 
        isFetching, 
        page, 
        setPage 
    } = useGameElements(filterType);

    const [selectedItems, setSelectedItems] = useState<Filter[]>([]);

    const handleClear = () => {
        onClear(filterType);
    }

    const handleSelect = (name: string, id: number, isSelectedBefore: boolean) => {
        setSelectedItems(items => {
            let newItems;
            if (isSelectedBefore) {
                newItems = items.filter(item => item.id !== id)
            } else {
                newItems = [...items, { name, id }]
            } 
            onManageFilters(newItems, filterType);
            return newItems;
        })
    }

    return (
        <>
            <FilterHeader
                filterType={filterType}
                filters={filters}
                onClear={handleClear} />
            {isFetching ?
                (<>
                    {Array.from(Array(ItemsPerPage).keys()).map((index) => (
                        <Skeleton
                            aria-label='menu-item-skeleton'
                            key={index}
                            animation='wave'
                            variant='rectangular'
                            width='100%'
                            height={30}
                            sx={{ marginBottom: 1 }} />
                    ))}
                    <Skeleton
                        aria-label='pagination-skeleton'
                        animation='wave'
                        variant='rectangular'
                        width='100%'
                        height={50} />
                </>) :
                (<>
                    {data?.results?.map(result => (
                        <SelectableMenuItem
                            key={result?.id}
                            name={result?.name}
                            id={result?.id}
                            isSelected={selectedItems.map(item => item.id).includes(result?.id)}
                            onSelect={handleSelect} />
                    ))}
                    <Pagination
                        aria-label='pagination'
                        count={data?.count ? Math.ceil(data?.count / ItemsPerPage) : -1}
                        page={page}
                        onChange={(e, newPage: number) => setPage(newPage)}
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
                        }} />
                </>)
            }
        </>
    )
}

export default FilterMenuContent