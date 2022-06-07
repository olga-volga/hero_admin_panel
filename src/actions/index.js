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

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const fitersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        filters: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filterSet = (filter) => {
    return {
        type: 'FILTER_SET',
        filter: filter
    }
}