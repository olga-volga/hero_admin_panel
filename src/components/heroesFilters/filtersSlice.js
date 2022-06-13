import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    filterValue: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: (state) => {
            state.filtersLoadingStatus = 'loading';
        },
        fitersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filtersFetchingError: (state) => {
            state.filtersLoadingStatus = 'error';
        },
        filterSet: (state, action) => {
            state.filterValue = action.payload;
        }
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    fitersFetched,
    filtersFetchingError,
    filterSet
} = actions;