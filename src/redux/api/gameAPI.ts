import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { GamesListType } from '../../features/typeGuards'

const API_KEY = '216afc1f9f044e1daafe76a78da14b71'

type Query = {
    page: number;
    pageCount: number;
}

type Args = Query | {}

const isQuery = (args: Args): args is Query => {
    return (args as Query).page !== undefined && 
    (args as Query).pageCount !== undefined
}

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/'}),
    endpoints:(builder) => ({
        getGamesList: builder.query<ReturnType<typeof GamesListType>, Args>({ 
            query: (args) => {
                if (isQuery(args)) {
                    return `games?page=${args.page}&page_size=${args.pageCount}&key=${API_KEY}`
                }
                return `games?&key=${API_KEY}`
            },
            transformResponse: (rawResult: unknown) => {
                return GamesListType(rawResult)
            }
        })
    })
})

export const {
    useGetGamesListQuery
} = gameApi