import { useState } from 'react'

import GameList from './components/list/GameList'

function App() {
    
    return (
        <div className='w-screen min-h-screen flex items-center
        justify-center relative'>
            <GameList />
        </div>
    )
}

export default App
