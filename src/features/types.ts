export interface Game {
    id: 'number';
    slug: 'string';
    name: 'string';
    description: 'string';
    released: 'string';
    background_image: 'string';
    background_image_additional: 'string';
    rating: 'number';
}

export interface GamesList {
    count: 'number';
    next?: 'string';
    previous?: 'string';
    results: Game[] | [];
}