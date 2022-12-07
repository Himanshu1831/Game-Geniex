import React, { useTransition, useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination'
import Grid from '@mui/material/Grid'

import { GrFilter } from 'react-icons/gr'

import GameCard from '../components/cards/GameCard'
import GameCards from '../components/cards/GameCards'
import PaginationArrows from '../components/pagination/PaginationArrows'
import FilterDropdown from '../components/filters/FilterDropdown'
import FilterDrawer from '../components/filters/FilterDrawer'
import SearchAppBar from '../components/SearchAppBar'

import useGames, { Filter } from '../utils/hooks/useGames'
import { ItemsPerPage } from '../components/pagination'

const Games = () => {
    const [isPending, startTransition] = useTransition();
    const [filterDrawer, setFilterDrawer] = useState(false);

	const { 
        data, 
        isLoading,
        isFetching,
        error,
        isError,
        page,
        search,
        filters,
        setPage,
        setSearch,
        setFilters,
    } = useGames();

    const handleDrawerToggle = useCallback(() => {
        setFilterDrawer(prevState => !prevState);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }, []);

    const handlePrevious = useCallback(() => {
        startTransition(() => {
            if (page === 0) return;
            setPage(prev => prev - 1);
        })
    }, [page])

    const handleNext = useCallback(() => {
        startTransition(() => {
            setPage(prev => prev + 1)
        })
    }, [page])

    const handleFilters = (filters: Filter[], filterType: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: filters,
        }))
    }

    const handleClear = (filterType: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: [],
        }))
    }

    return (
        <Box sx={{
        width: '100%', 
        padding: 1, 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        position: 'relative'
        }}>
            <SearchAppBar 
                search={search} 
                handleChange={handleSearchChange} />

            <FilterDrawer 
                filters={filters} 
                open={filterDrawer} 
                handleDrawerToggle={handleDrawerToggle} 
                onManageFilters={handleFilters}
                onClear={handleClear} />

            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', padding: 1 }}>
                <Typography variant='h6' sx={{ flex: '1 1 0%' }}>RAWG Game Database</Typography>
                <IconButton 
                    sx={{ display: {xs: 'block',  md: 'none'}, marginLeft: 1 }}
                    onClick={handleDrawerToggle}>
                        <GrFilter />
                </IconButton>
            </Box>

            <Grid container width='100%' spacing={1} padding={1} mb={1} display={{ xs: 'none', sm: 'none', md: 'flex'}}>
                {Object.keys(filters).map(filter => (
                    <Grid item xs={12} md={3} lg={2} xl={12/7} key={filter}>
                        <FilterDropdown 
                            key={filter} 
                            filterType={filter}
                            filters={filters} 
                            onManageFilters={handleFilters} 
                            onClear={handleClear} />
                    </Grid>
                ))}
            </Grid>

            <Typography variant='body2' alignSelf='center' marginBottom={1.5}>
                {isFetching ? 'Loading...' : `${data?.count || 0} games found`}
            </Typography>

            <GameCards 
                results={data?.results}
                isFetching={isFetching} />

            <Pagination
                count={data?.count ? Math.ceil(data?.count / ItemsPerPage) : -1}
                page={page}
                onChange={(e, newPage: number) => setPage(newPage)}
                showFirstButton
                showLastButton
                color='primary'
                boundaryCount={0}
                siblingCount={1}
                sx={{
                    paddingY: 2,
                    alignSelf: 'center',
                    '& .MuiPagination-ul': {
                        padding: 0,
                    }
                }} />

            <PaginationArrows 
                page={page}
                totalCount={data?.count} 
                onNext={handleNext}
                onPrevious={handlePrevious}/>

            {isPending && (
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
                open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </Box>
    )
}

export default Games