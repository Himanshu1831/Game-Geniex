import { render, screen } from '../../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import GameCards from './GameCards'
import { MOCK_GAMES } from '../../api/MockGames'

const setUp = () => {
    const utils = render(<GameCards results={MOCK_GAMES.results} isFetching={false} />);

    return utils;
}

test('should display all games', () => {
    setUp();

    expect(screen.getAllByRole('img')).toHaveLength(MOCK_GAMES.results.length);
    expect(screen.getAllByRole('heading')).toHaveLength(MOCK_GAMES.results.length);
    expect(screen.getAllByTestId(/rating/i)).toHaveLength(MOCK_GAMES.results.length);
    expect(screen.getAllByTestId(/released/i)).toHaveLength(MOCK_GAMES.results.length);
    expect(screen.getAllByTestId(/genre/id)).toHaveLength(MOCK_GAMES.results.length * 2);
})