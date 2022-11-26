import Box from '@mui/material/Box'

import Games from './pages/Games'
function App() {

    return (
        <Box sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Games />
        </Box>
    )
}

export default App
