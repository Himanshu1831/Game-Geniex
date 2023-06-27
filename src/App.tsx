import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import Games from './pages/Games'
import { useTheme } from '@mui/material/styles'

function App() {
    const theme = useTheme();

    return (
        <Box sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Games />
        
        </Box>
    )
}

export default App
