const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    heroeId: null
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
        default: return state
    }
}

export default reducer;