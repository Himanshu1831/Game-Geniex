import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { GamesListType, GameType } from '../../features/typeGuards';

import GameCard from './GameCard';

type Game = ReturnType<typeof GameType>
type GamesList = ReturnType<typeof GamesListType>

type PageInfo = { page: number, pageCount: number }
const GameCards = ({ data, isFetching, pageInfo } 
    : { data : GamesList | undefined, isFetching: boolean, pageInfo: PageInfo }) => {
    const [gamesSoFar, updateGamesSoFar] = useState<Array<Game>>([]);

    useEffect(() => {
        if (data) updateGamesSoFar(prev => [...prev, ...data.results])
    }, [data])

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' },
            gap: 2,
            padding: 2,
        }}>
            {isFetching && Array.from(Array(10).keys()).map((index: number) => (
                <GameCard key={index} />
            ))}
            {!isFetching && data && gamesSoFar.map((game: Game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </Box>
        
    )
}

export default GameCards