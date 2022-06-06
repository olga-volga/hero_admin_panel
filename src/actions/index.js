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

export const heroeAdd = (heroe) => {
    return {
        type: 'HEROE_ADD',
        newHeroe: heroe
    }
}

export const fitersFetch = (filters) => {
    return {
        type: 'FILTERS_FETCH',
        filters: filters
    }
}

export const filterSet = (filter) => {
    return {
        type: 'FILTER_SET',
        filter: filter
    }
}