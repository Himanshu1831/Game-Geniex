import { screen, render } from '../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import GameModal from './GameModal'
import { MOCK_GAME } from '../api/MockGames'
import useGameDetails from '../utils/hooks/useGameDetails'

const mockedUseGameDetails = useGameDetails as jest.Mock<any>

jest.mock('../utils/hooks/useGameDetails')

const setUp = () => {
    const handleClose = jest.fn();

    const utils = render(<GameModal 
        id={MOCK_GAME.id} 
        open={true}
        handleClose={handleClose} 
        images={[]}/>
    )

    return { 
        ...utils,
        handleClose
    }
}

test('should render', () => {
    mockedUseGameDetails.mockImplementation(
        () => ({
            data: MOCK_GAME,
            isFetching: false,
        })
    )

    const { queryAllByRole } = setUp();

    expect(screen.getByText(MOCK_GAME.name)).toBeInTheDocument();
    expect(screen.getByText(MOCK_GAME.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(MOCK_GAME.released)).toBeInTheDocument();
})
