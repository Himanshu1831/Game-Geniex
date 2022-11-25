import React, { useTransition, useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'

import { BsTable, BsCardText } from 'react-icons/bs'
import { GrFilter } from 'react-icons/gr'

import GameTable from '../components/table/GameTable'
import GameCard from '../components/cards/GameCard'
import Cards from '../components/cards/Cards'
import Pagination from '../components/pagination/Pagination'

import { useGetGamesListQuery } from '../redux/api/gameAPI'
import PaginationArrows from '../components/pagination/PaginationArrows'
import { ItemsPerPage } from '../components/pagination'
import TabularPagination from '../components/pagination/TabularPagination'
import { useAppSelector } from '../features/hooks'
import { TypeGuard } from '../features'
import FilterDropdown from '../components/filters/FilterDropdown'
import { Filter, FiltersState } from '../redux/features/filtersSlice'
import FilterDrawer from '../components/filters/FilterDrawer'

interface GamesProps {
    readonly results: Array<ReturnType<TypeGuard<any>>> | undefined;
    readonly isFetching: boolean;
}

interface CardsProps extends GamesProps {
    readonly page: number;
    readonly setPage: React.Dispatch<React.SetStateAction<number>>;
    readonly totalCount: number | undefined;
    readonly element: (props: any) => JSX.Element;
}

interface TableProps extends GamesProps {
    readonly page: number;
    readonly setPage: React.Dispatch<React.SetStateAction<number>>;
    readonly rowsPerPage: number;
    readonly setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

enum Mode {
    Table,
    Cards
}

const CardMode = ({ results, page, setPage, isFetching, totalCount, element }: CardsProps) => (
    <>
        <Cards results={results} isFetching={isFetching} element={element} />
        <Pagination page={page + 1} setPage={setPage} totalCount={totalCount} />
    </>
)

const TableMode = ({results, isFetching, page, rowsPerPage, setPage, setRowsPerPage}: TableProps) => (
    <>
        <GameTable results={results} isFetching={isFetching} rowsPerPage={rowsPerPage} />
        <TabularPagination page={page} rowsPerPage={rowsPerPage} setPage={setPage}
            setRowsPerPage={setRowsPerPage} />
    </>
)

const makeQuery = (page: number, pageCount: number, endpoint: string, search: string, filters: FiltersState) => {
    const query = {
        page,
        pageCount,
        endpoint,
        search,
    }
    Object.keys(filters).map((key: string) => {
        if ((filters[key] as string[]).length > 0) {
            query[key] = (filters[key] as Filter[]).map(filter => filter.id).join(',')
        }
    })
    return query;
}

const Games = () => {
    const [isPending, startTransition] = useTransition();
    const [mode, setMode] = useState<Mode>(Mode.Table)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const search = useAppSelector(state => state.app.search)
    const filters = useAppSelector(state => state.filters);
    const [filterDrawer, setFilterDrawer] = useState(false);

	const { data, isFetching, error } = useGetGamesListQuery(makeQuery(
        page + 1, 
        mode === Mode.Table ? rowsPerPage : ItemsPerPage, 
        'games', 
        search, 
        filters
    ));

    const handleChangeMode = (event: React.MouseEvent<HTMLElement>, newMode: Mode) => {
        startTransition(() => {
            setMode(newMode);
        })
    }

    const handleDrawerToggle = useCallback(() => {
        setFilterDrawer(prevState => !prevState);
    }, []);

    return (
        <Box sx={{
        width: '100%', 
        padding: 1, 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        position: 'relative'
        }}>
            <FilterDrawer open={filterDrawer} handleDrawerToggle={handleDrawerToggle} />
            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', padding: 1 }}>
                <Typography variant='h6' sx={{ flex: '1 1 0%'}}>Video Games</Typography>
                <ToggleButtonGroup
                color="primary"
                value={mode}
                exclusive
                onChange={handleChangeMode}
                aria-label="Display Modes">
                    <ToggleButton value={Mode.Table}><BsTable /></ToggleButton>
                    <ToggleButton value={Mode.Cards}><BsCardText /></ToggleButton>
                </ToggleButtonGroup>
                <IconButton 
                    sx={{ display: {xs: 'block',  md: 'none'}, marginLeft: 1 }}
                    onClick={handleDrawerToggle}>
                        <GrFilter />
                </IconButton>
            </Box>
            <Grid container width='100%' spacing={1} padding={1} mb={1} display={{ xs: 'none', sm: 'none', md: 'flex'}}>
                {Object.keys(filters).map(filter => (
                    <Grid item xs={12} md={3} lg={2} xl={12/7} key={filter}>
                        <FilterDropdown key={filter} filterType={filter} />
                    </Grid>
                ))}
            </Grid>
            <Typography variant='body2' alignSelf='center' marginBottom={1.5}>
                {isFetching ? 'Loading...' : `${data?.count || 0} games found`}
            </Typography>
            {mode === Mode.Table ? (
                <TableMode 
                results={data?.results} 
                isFetching={isFetching} 
                rowsPerPage={rowsPerPage} 
                page={page} 
                setPage={setPage}
                setRowsPerPage={setRowsPerPage} />
            ) : (
                <>
                    <CardMode 
                    results={data?.results} 
                    isFetching={isFetching} 
                    element={GameCard} 
                    page={page} 
                    setPage={setPage} 
                    totalCount={data?.count} />
                </>
            )}
            <PaginationArrows page={page} setPage={setPage} rowsPerPage={rowsPerPage} totalCount={data?.count} />
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