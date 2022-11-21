import Box from '@mui/material/Box'
import Games from './components/Games'

function App() {
    return (
        <Box sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <Games />
        </Box>
    )
}

export default App
