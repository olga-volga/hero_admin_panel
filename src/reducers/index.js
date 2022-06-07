const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    heroeId: null,
    filterValue: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROE_GET_ID':
            return {
                ...state,
                heroeId: action.payload
            }
        case 'HEROE_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== state.heroeId)
            }
        case 'HEROE_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.newHeroe]
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.filters,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTER_SET':
            return {
                ...state,
                filterValue: action.filter
            }
        default: return state
    }
}

export default reducer;