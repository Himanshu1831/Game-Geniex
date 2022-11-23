import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    search: string, 
}

const initialState: AppState = {
    search: '',
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
})

export const {
    updateSearch
} = appSlice.actions

export default appSlice.reducer