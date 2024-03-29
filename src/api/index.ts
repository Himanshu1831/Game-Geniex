import { Filters } from "../utils/hooks/useGames";
import { TypeGuard } from "../utils/typeguards"

const API_KEY = 'a1091ee65114422589fe07d1b8c5a66a'

export interface Query {
    endpoint: string;
    page: number;
}

export interface SearchQuery extends Query {
    search: string;
}

type Filtered = {
    [Property in keyof Filters]?: string;
}

export type FilteredQuery = Filtered & {
    endpoint: string,
    search?: string,
    page?: number,
    pageCount?: number,
}

export type Args = Query | SearchQuery | FilteredQuery

export const isSearchQuery = (args: Args): args is SearchQuery => {
    return (args as SearchQuery).search !== undefined 
    && (args as SearchQuery).search !== ''
}

export const isFilteredQuery = (args: Args): args is FilteredQuery => {
    return (args as FilteredQuery).creators !== undefined || 
    (args as FilteredQuery).developers !== undefined ||
    (args as FilteredQuery).publishers !== undefined ||
    (args as FilteredQuery).genres !== undefined ||
    (args as FilteredQuery).stores !== undefined ||
    (args as FilteredQuery).tags !== undefined ||
    (args as FilteredQuery).platforms !== undefined
}

export const queryMaker = (args: Args, pageCount=10) => {
    if (isFilteredQuery(args)) {
        return `${args.endpoint}?` + 
        `${args.page !== undefined ? `page=${args.page}&page_size=${pageCount}` : ''}` + 
        `${args.search !== undefined ? `&search=${args.search}` : ''}` + 
        `${args.creators !== undefined ? `&creators=${args.creators}` : ''}` + 
        `${args.developers !== undefined ? `&developers=${args.developers}` : ''}` + 
        `${args.publishers !== undefined ? `&publishers=${args.publishers}` : ''}` + 
        `${args.genres !== undefined ? `&genres=${args.genres}` : ''}` + 
        `${args.tags !== undefined ? `&tags=${args.tags}` : ''}` + 
        `${args.stores !== undefined ? `&stores=${args.stores}` : ''}` + 
        `${args.platforms !== undefined ? `&platforms=${args.platforms}` : ''}` + 
        `&key=${API_KEY}`
    }
    if (isSearchQuery(args)){
        return `${args.endpoint}?page=${args.page}&page_size=${pageCount}&search=${args.search}&key=${API_KEY}`
    }
    return `${args.endpoint}?page=${args.page}&page_size=${pageCount}&key=${API_KEY}`
}

export const detailsQuery = (id: number) => `games/${id}?&key=${API_KEY}`

export const transformFn = (typeGuard: TypeGuard<any>) => (rawResult: unknown) => typeGuard(rawResult);
