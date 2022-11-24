import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Filter {
    id: string;
    name: string;
}

export interface FiltersState {
    genres: Filter[];
    tags: Filter[];
    developers: Filter[];
    creators: Filter[];
    publishers: Filter[];
    platforms: Filter[];
    stores: Filter[];
}

const initialState: FiltersState = {
    genres: [],
    tags: [],
    developers: [],
    creators: [],
    publishers: [],
    platforms: [],
    stores: [],
}


type SingleFilter = { 
    name: string;
    id: string,
    filterType: string,
}

type MultipleFilters = {
    names: string[] | undefined;
    ids: string[] | undefined;
    filterType: string;
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<SingleFilter>) => {
            const { name, id, filterType } = action.payload;
            (state[filterType] as Filter[]).push({ name, id })
        },
        removeFilter: (state, action: PayloadAction<SingleFilter>) => {
            const { id, filterType } = action.payload;
            state[filterType] = state[filterType].filter((filter: string) => filter !== id)
        },
        addFilters: (state, action: PayloadAction<MultipleFilters>) => {
            const { names, ids, filterType } = action.payload;
            if (Array.isArray(ids) && Array.isArray(names) && names.length === ids.length) {
                for (let i = 0; i < names.length; i++) {
                    (state[filterType] as Filter[]).push({ name: names[i], id: ids[i] })
                }
            }
        },
        clearFilters: (state, action: PayloadAction<string>) => {
            state[action.payload] = [];
        }
    }
})

export const {
    addFilter,
    removeFilter,
    addFilters,
    clearFilters,
} = filtersSlice.actions

export default filtersSlice.reducer