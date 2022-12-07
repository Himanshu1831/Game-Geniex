export const MOCK_GAMES = {
    count: 5,
    results: [
        {
            id: 3498, 
            slug: 'grand-theft-auto-v',
            name: 'Grand Theft Auto V',
            released: '2013-09-17',
            background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
            genres: [
                { slug: 'action', name: 'Action' },
                { slug: 'adventure', name: 'Adventure' }
            ],
            metacritic: 91,
            rating: 4.47,
            tags: [
                { id: 31, slug: 'singleplayer', name: 'Singleplayer' },
                { id: 7, slug: 'multiplayer', name: 'Multiplayer' },
                { id: 13, slug: 'atmospheric', name: 'atmospheric' }
            ]
        }, 
        {
            id: 3499, 
            slug: 'grand-theft-auto-vi',
            name: 'Grand Theft Auto VI',
            released: '2014-05-10',
            background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
            genres: [
                { slug: 'action', name: 'Action' },
                { slug: 'adventure', name: 'Adventure' },
                { slug: 'shooter', name: 'Shooter' }
            ],
            metacritic: 92,
            rating: 4.44,
            tags: [
                { id: 31, slug: 'singleplayer', name: 'Singleplayer' },
                { id: 7, slug: 'multiplayer', name: 'Multiplayer' },
                { id: 13, slug: 'atmospheric', name: 'atmospheric' }
            ]
        },
        {
            id: 3500, 
            slug: 'grand-theft-auto-vii',
            name: 'Grand Theft Auto VII',
            released: '2016-09-17',
            background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
            genres: [
                { slug: 'action', name: 'Action' },
                { slug: 'adventure', name: 'Adventure' },
                { slug: 'shooter', name: 'Shooter' },
            ],
            metacritic: 91,
            rating: 4.47,
            tags: [
                { id: 31, slug: 'singleplayer', name: 'Singleplayer' },
                { id: 7, slug: 'multiplayer', name: 'Multiplayer' },
                { id: 13, slug: 'atmospheric', name: 'atmospheric' }
            ]
        },
        {
            id: 3501, 
            slug: 'grand-theft-auto-viii',
            name: 'Grand Theft Auto VIII',
            released: '2013-09-17',
            background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
            genres: [
                { slug: 'action', name: 'Action' },
                { slug: 'adventure', name: 'Adventure' }
            ],
            metacritic: 91,
            rating: 4.47,
            tags: [
                { id: 31, slug: 'singleplayer', name: 'Singleplayer' },
                { id: 7, slug: 'multiplayer', name: 'Multiplayer' },
                { id: 13, slug: 'atmospheric', name: 'atmospheric' }
            ]
        },
        {
            id: 3502, 
            slug: 'grand-theft-auto-ix',
            name: 'Grand Theft Auto IX',
            released: '2013-09-17',
            background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
            genres: [
                { slug: 'action', name: 'Action' },
                { slug: 'adventure', name: 'Adventure' }
            ],
            metacritic: 91,
            rating: 4.47,
            tags: [
                { id: 31, slug: 'singleplayer', name: 'Singleplayer' },
                { id: 7, slug: 'multiplayer', name: 'Multiplayer' },
                { id: 13, slug: 'atmospheric', name: 'atmospheric' }
            ]
        }
    ]
}

export const MOCK_GAME = {
    id: 3498, 
    slug: 'grand-theft-auto-v',
    name: 'Grand Theft Auto V',
    released: '2013-09-17',
    background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
    genres: [
        { slug: 'action', name: 'Action' },
        { slug: 'adventure', name: 'Adventure' }
    ],
    metacritic: 91,
    rating: 4.47,
    tags: [
        { id: 31, slug: 'singleplayer', name: 'Singleplayer' },
        { id: 7, slug: 'multiplayer', name: 'Multiplayer' },
        { id: 13, slug: 'atmospheric', name: 'atmospheric' }
    ],
    website: 'website.com',
    stores: [
        { 
            id: 1, 
            store: {
                domain: 'store-1.com', name: 'store-1'
            }
        },
        { 
            id: 2, 
            store: {
                domain: 'store-2.com', name: 'store-2'
            }
        },
        { 
            id: 3, 
            store: {
                domain: 'store-3.com', name: 'store-3'
            }
        },
    ],
    developers: [
        { id: 1, slug: 'developer-1', name: 'developer-1' },
        { id: 2, slug: 'developer-2', name: 'developer-2' },
        { id: 3, slug: 'developer-3', name: 'developer-3' }
    ],
    publishers: [
        { id: 1, slug: 'publisher-1', name: 'publisher-1' },
        { id: 2, slug: 'publisher-2', name: 'publisher-2' },
        { id: 3, slug: 'publisher-3', name: 'publisher-3' }
    ],
    platforms: [
        {
            released_at: '2022-10-10',
            platform: {
                image_background: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
                name: 'platform-1'
            }
        },
        {
            released_at: '2022-10-12',
            platform: {
                image_background: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
                name: 'platform-2'
            }
        },
        {
            released_at: '2022-10-15',
            platform: {
                image_background: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
                name: 'platform-3'
            }
        }
    ],
    description_raw: '<p>This is the game description.</p>',
    description: 'This is the game description.',
}