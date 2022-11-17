export interface Game {
    id: string | number;
    slug: string | number;
    name: string | number;
    released: string | number;
    background_image: string | number;
    background_image_additional: string | number;
    rating: string | number;
    genres: string | number;
    dominant_color: string | number;
}

export interface GamesList {
    count: number;
    next?: string;
    previous?: string;
    results: [];
}