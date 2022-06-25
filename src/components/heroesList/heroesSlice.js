import { createSelector, createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    state => state.filters.filterValue,
    selectAll,
    (filterValue, heroes) => {
        return filterValue === 'all' ? heroes : heroes.filter(item => item.element === filterValue);
    }
);

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroeAdd: (state, action) => {
            // state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload);
        },
        heroeDelete: (state, action) => {
            // state.heroes = state.heroes.filter(item => item.id !== action.payload);
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                // state.heroes = action.payload;
                heroesAdapter.setAll(state, action.payload);
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

export const {heroeAdd, heroeDelete} = actions;