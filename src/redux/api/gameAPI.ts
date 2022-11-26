import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Args, detailsQuery, queryMaker, transformFn } from '.'

import { GamesListType, GameType, OtherTypeList } from '../../features/typeGuards'

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.rawg.io/api/',
    }),
    endpoints:(builder) => ({
        getGamesList: builder.query<ReturnType<typeof GamesListType>, Args>({ 
            query: queryMaker,
            transformResponse: transformFn(GamesListType),
        }),
        getResourceList: builder.query<ReturnType<typeof OtherTypeList>, Args>({
            query: queryMaker,
            transformResponse: transformFn(OtherTypeList),
        }),
        getGameDetails: builder.query<ReturnType<typeof GameType>, number>({
            query: detailsQuery,
            transformResponse: (rawResult: unknown) => {
                return GameType(rawResult);
            }
        })
    })
})

export const {
    useGetGamesListQuery,
    useGetResourceListQuery,
    useGetGameDetailsQuery,
} = gameApi