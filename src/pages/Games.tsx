import React, { useTransition, useState } from 'react'

import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { BsTable, BsCardText } from 'react-icons/bs'

import GameTable from '../components/table/GameTable'
import GameCard from '../components/cards/GameCard'
import Cards from '../components/cards/Cards'
import Pagination from '../components/pagination/Pagination'

import { useGetGamesListQuery } from '../redux/api/gameAPI'
import { GamesListType } from '../features/typeGuards'
import PaginationArrows from '../components/pagination/PaginationArrows'
import { ItemsPerPage } from '../components/pagination'
import TabularPagination from '../components/pagination/TabularPagination'
import { useAppSelector } from '../features/hooks'
import { Divider } from '@mui/material'

export interface GamesProps {
    readonly data: ReturnType<typeof GamesListType> | undefined;
    readonly isFetching: boolean;
    readonly rowsPerPage: number;
}

enum Mode {
    Table,
    Cards
}

const Games = () => {
    const [isPending, startTransition] = useTransition();
    const [mode, setMode] = useState<Mode>(Mode.Table)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const search = useAppSelector(state => state.app.search)

	const { data, isFetching, error } = useGetGamesListQuery({
        page: page + 1,
        pageCount: mode === Mode.Table ? rowsPerPage : ItemsPerPage, 
        endpoint: 'games',
        search,
    });

    const handleChangeMode = (event: React.MouseEvent<HTMLElement>, newMode: Mode) => {
        startTransition(() => {
            setMode(newMode);
        })
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
            </Box>
            <Typography variant='body2' alignSelf='center' marginBottom={1.5}>
                {isFetching ? 'Loading...' : `${data?.count || 0} games found`}
            </Typography>
            {mode === Mode.Table ? (
                <>
                    <GameTable data={data} isFetching={isFetching} rowsPerPage={rowsPerPage} />
                    <TabularPagination page={page} rowsPerPage={rowsPerPage} setPage={setPage}
                    setRowsPerPage={setRowsPerPage} />
                </>
            ) : (
                <>
                    <Cards results={data?.results} isFetching={isFetching} element={GameCard} />
                    <Pagination page={page + 1} setPage={setPage} totalCount={data?.count} />
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