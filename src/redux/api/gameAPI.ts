import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { GamesList } from '../../features/types'

const API_KEY = '216afc1f9f044e1daafe76a78da14b71'

type args = {
    page: number;
    pageCount: number;
}

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/'}),
    endpoints:(builder) => ({
        getGamesList: builder.query<GamesList, args>({ 
            query: ({page, pageCount}) => `games?page=${page}&page_size=${pageCount}&key=${API_KEY}`,
            transformResponse: (rawResult: GamesList) => {
                return rawResult;
            }
        })
    })
})

export const {
    useGetGamesListQuery
} = gameApi