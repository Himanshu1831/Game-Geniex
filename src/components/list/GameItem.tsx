import React, { ReactNode } from 'react'

import { Game } from '../../features/types'

interface withKeyProps {
    key: React.Key;
    game: Game;
    children?: ReactNode;
}

const GameItem: React.FC<withKeyProps> = ({ game }) => {
    console.log(game)
    return (
        <div className='gameItem w-full grid grid-cols-9 bg-slate-200 p-2
        place-items-center place-content-center lg:text-lg text-sm cursor-pointer 
        hover:opacity-100 opacity-70 transition-all gap-1'>
            <div className='h-[100px]'>
                <img className='rounded-lg shadow-lg object-cover max-h-full max-w-full
                    shadow-gray-600 place-self-center aspect-square' src={game.background_image} alt={game.name} />
            </div>
            <p className='pl-2 col-start-2 col-end-4'>{game.name}</p>
            <p className='pl-2 col-start-4 col-end-8 truncate'>{game.description}</p>
            <p className='col-start-8'>{game.released}</p>
            <p className='col-start-9'>{typeof game.rating === 'number' && (game.rating / 5 * 100).toFixed(1) + '%'}</p>
        </div>
    )
}

export default GameItem