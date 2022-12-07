import { render, screen } from '../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import Games from './Games'
import useGames from '../utils/hooks/useGames'
import { MOCK_GAMES } from '../api/MockGames'

const mockedUseGames = useGames as jest.Mock<any>

jest.mock('../utils/hooks/useGames')

const filters = {
    genres: [],
    tags: [],
    developers: [],
    publishers: [],
    stores: [],
    platforms: [],
    creators: []
}

const setPage = jest.fn();
const setSearch = jest.fn();
const setFilters = jest.fn();

test('should display all cards', () => {
    mockedUseGames
    .mockImplementation(() => ({
        data: MOCK_GAMES,
        isFetching: false,
        page: 1,
        search: '',
        filters,
        setSearch,
        setPage,
        setFilters
    }))

    render(<Games />);
    expect(screen.getAllByTestId('card')).toHaveLength(MOCK_GAMES.results.length);
})