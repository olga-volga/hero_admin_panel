import { createReducer } from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroeAdd,
    heroeDelete
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, (builder) => {
    builder
        .addCase(heroesFetching, (state) => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroeAdd, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroeDelete, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {});
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROE_DELETE':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//             }
//         case 'HEROE_ADD':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.newHeroe]
//             }
//         default: return state
//     }
// }

export default heroes;