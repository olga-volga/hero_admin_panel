export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroeGetId = (id) => {
    return {
        type: 'HEROE_GET_ID',
        payload: id
    }
}

export const heroeDelete = () => {
    return {
        type: 'HEROE_DELETE'
    }
}