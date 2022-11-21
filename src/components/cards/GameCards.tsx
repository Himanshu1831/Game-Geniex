import { Box } from '@mui/material';

import { GameType } from '../../features/typeGuards';

import GameCard from './GameCard';
import { GamesProps } from '../Games';

type Game = ReturnType<typeof GameType>

const GameCards = ({ data, isFetching, rowsPerPage }: GamesProps) => {
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
        </Box>
    )
}

export default GameCards