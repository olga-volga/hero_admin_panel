// import { createAction } from "@reduxjs/toolkit";
// import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';
// import {filtersFetching, fitersFetched, filtersFetchingError} from '../components/heroesFilters/filtersSlice';

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }

// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//     request("http://localhost:3001/filters")
//         .then(data => dispatch(fitersFetched(data)))
//         .catch(() => dispatch(filtersFetchingError()))
// }

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroeDelete = (id) => {
//     return {
//         type: 'HEROE_DELETE',
//         payload: id
//     }
// }

// export const heroeDelete = createAction('HEROE_DELETE');

// export const heroeAdd = (heroe) => {
//     return {
//         type: 'HEROE_ADD',
//         newHeroe: heroe
//     }
// }

// export const heroeAdd = createAction('HEROE_ADD');

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const fitersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         filters: filters
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const filterSet = (filter) => {
//     return {
//         type: 'FILTER_SET',
//         filter: filter
//     }
// }

// export const filterSet = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'FILTER_SET',
//             filter: filter
//         })
//     }, 500)
// }