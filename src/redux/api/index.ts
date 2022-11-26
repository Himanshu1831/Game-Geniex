import { TypeGuard } from "../../features";
import { FiltersState as Filters } from "../features/filtersSlice";

const API_KEY = '216afc1f9f044e1daafe76a78da14b71'

export interface Query {
    endpoint: string;
}

export interface PaginatedQuery extends Query {
    page: number;
    pageCount: number;
}

export interface SearchQuery extends PaginatedQuery {
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

export type Args = Query | PaginatedQuery | SearchQuery | FilteredQuery

export const isPaginatedQuery = (args: Args): args is PaginatedQuery => {
    return (args as PaginatedQuery).page !== undefined && 
    (args as PaginatedQuery).pageCount !== undefined
}

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

export const queryMaker = (args: Args) => {
    if (isFilteredQuery(args)) {
        return `${args.endpoint}?` + 
        `${args.page !== undefined ? `page=${args.page}&page_size=${args.pageCount}` : ''}` + 
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
        return `${args.endpoint}?page=${args.page}&page_size=${args.pageCount}&search=${args.search}&key=${API_KEY}`
    }
    if (isPaginatedQuery(args)) {
        return `${args.endpoint}?page=${args.page}&page_size=${args.pageCount}&key=${API_KEY}`
    } 
    return `${args.endpoint}?&key=${API_KEY}`
}

export const detailsQuery = (id: number) => `games/${id}?&key=${API_KEY}`

export const transformFn = (typeGuard: TypeGuard<any>) => (rawResult: unknown) => typeGuard(rawResult);
