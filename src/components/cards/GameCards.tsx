import { useState } from 'react';
import { Box } from '@mui/material';

import { GameType } from '../../features/typeGuards';
import { useGetGamesListQuery } from '../../redux/api/gameAPI';

import GameCard from './GameCard';
import Pagination from '../Pagination';

type Game = ReturnType<typeof GameType>

const GameCards = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { data, isFetching } = useGetGamesListQuery({ page: page + 1, pageCount: rowsPerPage})

    return (
        <Box sx={{ width: '100%', display: 'grid'}}>
            <Box sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' },
                gap: 2,
                padding: 2,
            }}>
                {isFetching && Array.from(Array(rowsPerPage).keys()).map((index: number) => (
                    <GameCard key={index} />
                ))}
                {!isFetching && data && data.results.map((game: Game) => (
                    <GameCard key={game.id} game={game} />
                ))}
                
            </Box>
            <Pagination page={page} rowsPerPage={rowsPerPage} setPage={setPage}
            setRowsPerPage={setRowsPerPage} />
        </Box>
    )
}

export default GameCards