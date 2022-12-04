import '@testing-library/jest-dom/extend-expect'

import { gameAPI } from './gameAPI'
import { MOCK_GAMES } from './MockGames';

test('should return all games', async () => {
    global.fetch = jest.fn()
    .mockImplementation(
        jest.fn(() => 
            Promise.resolve({ 
                ok: true,
                status: 200,
                json: () => Promise.resolve(MOCK_GAMES), 
            } as Response), 
        ) as jest.Mock 
    ) 

    return gameAPI.getResources({ endpoint: 'games', page: 1 })
        .then((data) => expect(data).toEqual(MOCK_GAMES));
})

test('should return correct game with given id', () => {
    global.fetch = jest.fn()
    .mockImplementation(
        jest.fn(() => 
            Promise.resolve({ 
                ok: true,
                status: 200,
                json: () => Promise.resolve(MOCK_GAMES.results[0]), 
            } as Response), 
        ) as jest.Mock 
    ) 

    return gameAPI.find(MOCK_GAMES.results[0].id)
    .then((data) => expect(data.id).toEqual(MOCK_GAMES.results[0].id));
})

test('should throw error when request fails', () => {
    global.fetch = jest.fn()
    .mockImplementation(
        jest.fn(() => 
            Promise.resolve({ 
                status: 404,
                json: () => Promise.resolve(MOCK_GAMES.results[0]), 
            } as Response), 
        ) as jest.Mock
    ) 

    return gameAPI.find(MOCK_GAMES.results[0].id)
    .then((data) => console.log('data exists'))
    .catch((error) => expect(error).toBeInstanceOf(Error))

})