// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     filterValue: 'all'
// }

// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading'
//             }
//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.filters,
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         case 'FILTER_SET':
//             return {
//                 ...state,
//                 filterValue: action.filter
//             }
//         default: return state
//     }
// }

// export default filters;