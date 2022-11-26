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
            <Box 
            sx={{ 
                width: '100%', 
                padding: 1, 
                bgcolor: theme.palette.primary.main,
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <Typography
                    variant='body1'
                    sx={{
                        flex: 1,
                        color: 'white',
                        fontSize: { xs: 12, lg: 16 },
                    }}>
                    Data Source: &nbsp;
                    <Link
                        underline='hover'
                        component='a'
                        href='https://api.rawg.io/docs/'
                        sx={{
                            color: 'white',
                            fontSize: { xs: 12, lg: 16 },
                        }}>
                        RAWG Game Database
                    </Link>
                </Typography>
                <Link
                    underline='hover'
                    component='a'
                    href='https://github.com/serey-roth/gamestore'
                    sx={{
                        color: 'white',
                        fontSize: { xs: 12, lg: 16 },
                        fontFamily: theme.typography.fontFamily,
                    }}>
                    Serey Roth &copy; 2022
                </Link>
            </Box>
        </Box>
    )
}

export default App
