import React from 'react'

const GameSkeleton = () => (
    <div className='gameItem w-full grid grid-cols-9 bg-slate-200 p-2
    place-items-center place-content-center lg:text-lg text-sm cursor-pointer 
    hover:opacity-100 opacity-70 transition-all relative gap-1'>
        <div className='h-[100px] w-full col-span-2 bg-slate-300 rounded-lg animate-pulse'>
        </div>
        <p className='pl-2 col-start-3 col-end-8 bg-slate-300 rounded-lg animate-pulse h-full w-full'></p>
        <p className='col-start-8 bg-slate-300 rounded-lg animate-pulse h-full w-full'></p>
        <p className='col-start-9 bg-slate-300 rounded-lg animate-pulse h-full w-full'></p>
    </div>
)

type Props = {
    size: number;
}

const SkeletonList = ({size}: Props) => {
    return (
        <div className='flex flex-col w-full absolute inset-0'>
            <div className='w-full grid grid-cols-9 place-items-center py-5 bg-slate-400
            font-bold uppercase lg:text-lg'>
                <p className='col-span-2'>Game Cover</p>
                <p className='col-start-3 col-end-8'>Name</p>
                <p className=''>Released</p>
                <p className=''>Rating</p>
            </div>
            {Array.from(Array(size).keys()).map((num: number) => <GameSkeleton key={`game-${num}`}/>)}
        </div>
    )
}

export default SkeletonList