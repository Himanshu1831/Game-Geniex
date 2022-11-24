import { configureStore } from '@reduxjs/toolkit'
import { gameApi } from './api/gameAPI'

import appReducer from './features/appSlice'
import filtersReducer from './features/filtersSlice'

export const store = configureStore({
    reducer: {
        [gameApi.reducerPath]: gameApi.reducer,
        app: appReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(gameApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch