import { Container } from '@mui/material'
import GameCards from './components/cards/GameCards'
import GameTable from './components/table/GameTable'

function App() {
    return (
        <Container sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }} maxWidth={false}>
            <GameTable />
        </Container>
    )
}

export default App
