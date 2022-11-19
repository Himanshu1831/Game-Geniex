export type TypeGuard<T> = (val: unknown) => T;

export const string: TypeGuard<string> = (val: unknown) => {
    if (typeof val !== 'string') throw new Error(`${val} is actually of type ${typeof val}`);
    return val;
}

export const number: TypeGuard<number> = (val: unknown) => {
    if (typeof val !== 'number') throw new Error(`${val} is actually of type ${typeof val}`);
    return val;
}

export const array = <T>(inner: TypeGuard<T>) => (val: unknown): T[] => {
    if (!Array.isArray(val)) throw new Error(`${val} is actually of type ${typeof val}`);
    return val.map(inner);
}

export const object = <T extends Record<string, TypeGuard<any>>>(inner: T) => {
    return (val: unknown): { [P in keyof T]: ReturnType<T[P]> } => {
        if (val === null || typeof val !== 'object') throw new Error();

        const out: { [P in keyof T]: ReturnType<T[P]> } = {} as any;

        for (const k in inner) {
            if ((val as any)[k]) out[k] = inner[k]((val as any)[k])
        }

        return out
    }
}

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

export const GameType = object(GameTypeSchema)

export const GamesListType = object(GamesListTypeSchema)


