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

test('should display all game elements', () => {
    mockedUseGameDetails.mockImplementation(
        () => ({
            data: MOCK_GAME,
            isFetching: false,
        })
    )

    setUp();

    expect(screen.getByText(MOCK_GAME.name)).toBeInTheDocument();
    expect(screen.getByText(MOCK_GAME.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(MOCK_GAME.released)).toBeInTheDocument();
    expect(screen.getAllByLabelText('genres')).toHaveLength(MOCK_GAME.genres.length)
    expect(screen.getAllByLabelText('tags')).toHaveLength(MOCK_GAME.tags.length)
    expect(screen.getAllByLabelText('publishers')).toHaveLength(MOCK_GAME.publishers.length)
    expect(screen.getAllByLabelText('stores')).toHaveLength(MOCK_GAME.stores.length)
    expect(screen.getAllByLabelText('developers')).toHaveLength(MOCK_GAME.developers.length)
    expect(screen.getByText(/website\.com/i)).toBeVisible();
    expect(screen.getByText(MOCK_GAME.description)).toBeVisible();
})

test('should display skeletons while data is being fetched', () => {
    mockedUseGameDetails.mockImplementation(
        () => ({
            data: MOCK_GAME,
            isFetching: true,
        })
    )

    setUp();
    
    expect(screen.getAllByLabelText('skeleton')).toHaveLength(9);
})

test('should display skeletons when no data is returned', () => {
    mockedUseGameDetails.mockImplementation(
        () => ({
            data: null,
            isFetching: false,
        })
    )

    setUp();
    
    expect(screen.getAllByLabelText('skeleton')).toHaveLength(9);
})

test('handler is called when closeBtn is clicked', async () => {
    mockedUseGameDetails
    .mockImplementation(() => ({
        data: MOCK_GAME,
        isFetching: false,
    }))

    const { handleClose } = setUp();
    const closeBtn = screen.getByTestId('closeBtn');

    await userEvent.click(closeBtn);
    expect(handleClose).toBeCalledTimes(1);
})
