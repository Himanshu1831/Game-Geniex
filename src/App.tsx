import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'

import Games from './pages/Games'
import BrowseDrawer from './components/BrowseDrawer'
import SearchAppBar from './components/SearchAppBar'
import Resources from './pages/Resources'

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Box sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <BrowseDrawer open={drawerOpen} setOpen={setDrawerOpen}/>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flex: 1,
            }}>
                <SearchAppBar toggleDrawer={setDrawerOpen} />
                <Routes>
                    <Route index element={<Games />} />
                    <Route path='/games' element={<Games />} />
                    <Route path='/:resource' element={<Resources />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default App
