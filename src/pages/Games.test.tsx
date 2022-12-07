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
        isLoading: false,
        error: null,
        isError: false,
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

test('should display loading indicator', () => {
    mockedUseGames
    .mockImplementation(() => ({
        data: MOCK_GAMES,
        isLoading: true,
        error: null,
        isError: false,
        isFetching: false,
        page: 1,
        search: '',
        filters,
        setSearch,
        setPage,
        setFilters
    }))

    render(<Games />);
    expect(screen.getByText(/loading\.\.\./i)).toBeVisible();
})

test('should display error message when error occurred while fetching data', () => {
    mockedUseGames
    .mockImplementation(() => ({
        data: MOCK_GAMES,
        isLoading: false,
        error: new Error('error fetching games'),
        isError: true,
        isFetching: false,
        page: 1,
        search: '',
        filters,
        setSearch,
        setPage,
        setFilters
    }))

    render(<Games />);
    expect(screen.getByText(/something went wrong!/i)).toBeVisible();
})