import { string, number, array, object} from './typeGuards'

const TagSchema = {
    id: number,
    name: string,
    slug: string,
    image_background: string,
}

const ScreenShotSchema = {
    id: number, 
    image: string
}

const EsrbRatingSchema = {
    id: number, 
    name: string, 
    slug: string,
}

const PlatformSchema = {
    released_at: string,
    requirements_en: object({
        minimum: string, 
        recommended: string,
    }),
    platform: object({
        image_background: string,
        name: string,
    })
}

export const GameTypeSchema = {
    id: number,
    slug: string,
    name: string,
    released: string,
    background_image: string,
    rating: number,
    genres: array(object({
        slug: string, 
        name: string,
        image_background: string,
    })),
    dominant_color: string,
    metacritic: number,
    tags: array(object(TagSchema)),
    short_screenshots: array(object(ScreenShotSchema)),
    esrb_rating: object(EsrbRatingSchema),
    platforms: array(object(PlatformSchema)),
}

export const GamesListTypeSchema = {
    count: number,
    next: string,
    previous: string,
    results: array(object(GameTypeSchema))
}