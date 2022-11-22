import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { TypeGuard } from '../../features'
import { GamesListType, OtherTypeList } from '../../features/typeGuards'

const API_KEY = '216afc1f9f044e1daafe76a78da14b71'

type PaginatedQuery = {
    page: number;
    pageCount: number;
    endpoint: string;
}

type Args = PaginatedQuery | { endpoint: string }

const isPaginatedQuery = (args: Args): args is PaginatedQuery => {
    return (args as PaginatedQuery).page !== undefined && 
    (args as PaginatedQuery).pageCount !== undefined
}

const queryMaker = (args: Args) => {
    if (isPaginatedQuery(args)) {
        return `${args.endpoint}?page=${args.page}&page_size=${args.pageCount}&key=${API_KEY}`
    }
    return `${args.endpoint}?&key=${API_KEY}`
}

const transformFn = (typeGuard: TypeGuard<any>) => (rawResult: unknown) => typeGuard(rawResult);

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/'}),
    endpoints:(builder) => ({
        getGamesList: builder.query<ReturnType<typeof GamesListType>, Args>({ 
            query: queryMaker,
            transformResponse: transformFn(GamesListType),
        }),
        getResourceList: builder.query<ReturnType<typeof OtherTypeList>, Args>({
            query: queryMaker,
            transformResponse: transformFn(OtherTypeList),
        })
    })
})

export const {
    useGetGamesListQuery,
    useGetResourceListQuery
} = gameApi