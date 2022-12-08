import { screen, render } from '../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import GameModal from './GameModal'
import { MOCK_GAME } from '../api/MockGames'
import useGameDetails from '../utils/hooks/useGameDetails'

const mockedUseGameDetails = useGameDetails as jest.Mock<any>

jest.mock('../utils/hooks/useGameDetails')

const setUpSuccessful = () => {
    mockedUseGameDetails.mockImplementation(
        () => ({
            data: MOCK_GAME,
            isFetching: false,
        })
    )

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

const setUpFetching = () => {
    mockedUseGameDetails.mockImplementation(
        () => ({
            isFetching: true,
        })
    )

    const handleClose = jest.fn();

    const utils = render(<GameModal 
        id={1} 
        open={true}
        handleClose={handleClose} 
        images={[]}/>
    )

    return { 
        ...utils,
        handleClose
    }
}

const setUpError = () => {
    mockedUseGameDetails.mockImplementation(
        () => ({
            data: null,
            isFetching: true,
        })
    )

    const handleClose = jest.fn();

    const utils = render(<GameModal 
        id={1} 
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
    setUpSuccessful();

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

test('should not display skeletons while data is being fetched', () => {
    setUpFetching();
    expect(screen.queryAllByLabelText('skeleton')).toHaveLength(0);
})

test('should not display skeletons when no data is returned', () => {
    setUpError();
    expect(screen.queryAllByLabelText('skeleton')).toHaveLength(0);
})

test('should display loading indicator when data is being fetched', () => {
    setUpFetching();
    expect(screen.getByText(/loading\.\.\./i)).toBeVisible();
})

test('handler is called when closeBtn is clicked', async () => {
    const { handleClose } = setUpSuccessful();
    const closeBtn = screen.getByTestId('closeBtn');

    await userEvent.click(closeBtn);
    expect(handleClose).toBeCalledTimes(1);
})
