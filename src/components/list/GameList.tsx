import React, { useState } from 'react'

import { Game } from '../../features/types'
import { useGetGamesListQuery } from '../../redux/api/gameAPI'

import GameItem from './GameItem'
import SkeletonList from './SkeletonList'

const count = 4;

const GameList = () => {
    const [page, setPage] = useState(1);
	const { data, isFetching, error} = useGetGamesListQuery({page, pageCount: 10});

	if (isFetching) return <SkeletonList size={count} />
	if (!data || error) return <div>Error</div>

    return (
        <div className='flex flex-col w-full absolute inset-0'>
            <div className='w-full grid grid-cols-9 place-items-center py-5 bg-slate-400
            font-bold uppercase lg:text-lg text-sm'>
                <p className='p-1'>Game Cover</p>
                <p className='col-start-2 col-end-4 p-1'>Name</p>
                <p className='col-start-4 col-end-8 p-1'>Description</p>
                <p className='break-all p-1'>Released</p>
                <p className='break-all p-1'>Rating</p>
            </div>
            {data.results.map((game: Game, index: number) => <GameItem key={`game-${index}`} game={game}/>)}
        </div>
    )
}

export default GameList