import { GameTypeSchema, GamesListTypeSchema } from "./typeSchemas";

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

export const GameType = object(GameTypeSchema)

export const GamesListType = object(GamesListTypeSchema)
