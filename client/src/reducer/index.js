import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_BY_ID, GET_GENRES, GET_PLATFORMS, ADD_VIDEOGAME, RESET_STORE, RESET_VIDEOGAMES, LOADING, FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_NAME_ASC, ORDER_NAME_ASC_ALL, ORDER_NAME_DESC, ORDER_NAME_DESC_ALL, ORDER_RATING_ASC, ORDER_RATING_ASC_ALL, ORDER_RATING_DESC, ORDER_RATING_DESC_ALL } from '../actions/index'

const initialState = {
    videogames: [],
    genres: [],
    platforms: [],
    videogameById: [],
    loading: false,
    filteredVideogames: [],
    orderBy: 'Select',
    filterByGenre: 'All',
    filterByOrigin: 'All'
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload
            }
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: action.payload
            }
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                videogameById: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case ADD_VIDEOGAME:
            return {
                ...state,
                videogames: [],
            }

        case RESET_STORE:
            return {
                ...state,
                orderBy: 'Select',
                filterByGenre: 'All',
                filterByOrigin: 'All'
            }

        case RESET_VIDEOGAMES:
            return {
                ...state,
                videogames: [],
                filteredVideogames: [],
                orderBy: 'Select',
                filterByGenre: 'All',
                filterByOrigin: 'All'
            }

        case LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case FILTER_BY_GENRE:
            return {
                ...state,
                filteredVideogames: action.payload.videogames,
                filterByGenre: action.payload.genre,
            };

        case FILTER_BY_ORIGIN:
            return {
                ...state,
                filteredVideogames: action.payload.videogames,
                filterByOrigin: action.payload.origin,
            };

        case ORDER_NAME_ASC_ALL:
            return {
                ...state,
                videogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        case ORDER_RATING_ASC_ALL:
            return {
                ...state,
                videogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        case ORDER_NAME_DESC_ALL:
            return {
                ...state,
                videogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        case ORDER_RATING_DESC_ALL:
            return {
                ...state,
                videogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        case ORDER_NAME_ASC:
            return {
                ...state,
                filteredVideogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        case ORDER_RATING_ASC:
            return {
                ...state,
                filteredVideogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        case ORDER_NAME_DESC:
            return {
                ...state,
                filteredVideogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        case ORDER_RATING_DESC:
            return {
                ...state,
                filteredVideogames: action.payload.videogamesOrdered,
                orderBy: action.payload.name,
            };

        default:
            return state;
    }
}