import { render, screen } from '../../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import GameCard from './GameCard';
import { MOCK_GAME } from '../../api/MockGames';
import { GameType } from '../../utils/typeguards/typeGuards';

const setUp = () => {
    const handleSelect = jest.fn();
    const mockImages = [];

    const utils = render(
        <GameCard 
        info={GameType(MOCK_GAME)} 
        handleSelect={handleSelect} 
        images={mockImages} />
    )

    const card = screen.getByTestId('card');

    return {
        ...utils,
        card,
        handleSelect
    }
}

test('should render correctly with given props', () => {
    setUp();
    
    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.getByRole('heading')).toHaveTextContent(MOCK_GAME.name);
    expect(screen.getByTestId(/rating/i)).toHaveTextContent(MOCK_GAME.rating.toString());
    expect(screen.getByTestId(/released/i)).toHaveTextContent(MOCK_GAME.released);
    expect(screen.getAllByTestId(/genre/id)).toHaveLength(MOCK_GAME.genres.length);
})

test('handler is called when card is clicked', async () => {
    const { card, handleSelect } = setUp();

    await userEvent.click(card);
    expect(handleSelect).toBeCalledTimes(1);
})