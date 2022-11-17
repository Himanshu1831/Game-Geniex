import { Container } from '@mui/material'
import GameTable from './components/table/GameTable'

function App() {
    
    return (
        <Container sx={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }} maxWidth={false}>
            <GameTable />
        </Container>
    )
}

export default App
