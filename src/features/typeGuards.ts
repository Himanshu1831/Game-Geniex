import { number, string, object, array } from "."

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

const GameTypeSchema = {
    id: number,
    slug: string,
    name: string,
    description: string,
    description_raw: string,
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
    metacritic_url: string,
    tags: array(object(TagSchema)),
    short_screenshots: array(object(ScreenShotSchema)),
    esrb_rating: object(EsrbRatingSchema),
    platforms: array(object(PlatformSchema)),
    website: string,
    stores: array(object({
        id: number,
        store: object({
            domain: string,
            name: string,
        })
    })),
    developers: array(object({
        id: number,
        name: string,
        games_count: number,
    })),
    publishers: array(object({
        id: number,
        name: string,
        games_count: number,
    })),
}

const GamesListTypeSchema = {
    count: number,
    next: string,
    previous: string,
    results: array(object(GameTypeSchema))
}

const OtherTypeSchema = {
    id: number,
    name: string,
    slug: string,
    games_count: number,
    image_background: string,
    image: string,
    language: string,
    year_start: number,
    year_end: number,
    domain: string,
}

const OtherTypeListSchema = {
    count: number,
    next: string,
    previous: string,
    results: array(object(OtherTypeSchema))
}

export const OtherType = object(OtherTypeSchema);

export const OtherTypeList = object(OtherTypeListSchema);

export const GameType = object(GameTypeSchema);

export const GamesListType = object(GamesListTypeSchema);

const GameMoviesSchema = {
    id: number,
    name: string,
    preview: string,
    data: object({})
}

const GameAchievementsSchema = {
    id: number,
    name: string,
    description: string,
    image: string,
    percent: string
}

export const GameMoviesType = object(GameMoviesSchema);

export const GameAchievementsType = object(GameAchievementsSchema);