import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_VIDEOGAME_BY_ID  = 'GET_VIDEOGAME_BY_ID';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';

export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';

export const ORDER_NAME_ASC = 'ORDER_NAME_ASC';
export const ORDER_NAME_DESC = 'ORDER_NAME_DESC';
export const ORDER_RATING_ASC = 'ORDER_RATING_ASC';
export const ORDER_RATING_DESC = 'ORDER_RATING_DESC';

export const ORDER_NAME_ASC_ALL = 'ORDER_NAME_ASC_ALL';
export const ORDER_NAME_DESC_ALL = 'ORDER_NAME_DESC_ALL';
export const ORDER_RATING_ASC_ALL = 'ORDER_RATING_ASC_ALL';
export const ORDER_RATING_DESC_ALL = 'ORDER_RATING_DESC_ALL';

export const NAME_ASC = 'NAME_ASC';
export const NAME_DESC = 'NAME_DESC';
export const RATING_ASC = 'RATING_ASC';
export const RATING_DESC = 'RATING_DESC';
export const EXISTING = 'EXISTING';
export const NEW = 'NEW';

export const LOADING = 'LOADING'
export const RESET_STORE = 'RESET_STORE'
export const RESET_VIDEOGAMES = 'RESET_VIDEOGAMES'

export function getVideogames() {
    return function (dispatch) {
        dispatch({ type: LOADING, payload: true });
        return axios.get('http://localhost:3001/videogames')
        .then(response => response.data)
        .then((data) => {
            dispatch({type: GET_VIDEOGAMES, payload: data});
            dispatch({ type: LOADING, payload: false });
        })
    }
}

export function getVideogamesByName(name) {
    return function (dispatch) {
        dispatch({ type: LOADING, payload: true });
        axios.get(`http://localhost:3001/videogames/${name}`)
        .then(response => response.data)
        .then(data => {
            dispatch({type: GET_VIDEOGAMES_BY_NAME, payload: data});
            dispatch({ type: LOADING, payload: false });
        })
    }
}

export function getVideogameById(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then(response => response.data)
        .then(data => {
            dispatch({type: GET_VIDEOGAME_BY_ID, payload: data})
        })
    }
}

export function getGenres() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/genres`)
        .then(response => response.data)
        .then(data => {
            dispatch({type: GET_GENRES, payload: data})
        })
    }
}
export function getPlatforms() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/platforms`)
        .then(response => response.data)
        .then(data => {
            dispatch({type: GET_PLATFORMS, payload: data})
        })
    }
}

export function addVideogame(game) {  
  return function (dispatch) {
  axios.post('http://localhost:3001/videogame', game)
  .then(response => response.data)
  .then(data => {
      dispatch({type: ADD_VIDEOGAME, payload: data})
    });
  }
}

export function resetStore() {
  return (dispatch) => {
    dispatch({
      type: RESET_STORE
    });
  };
};

export function resetVideogames() {
  return (dispatch) => {
    dispatch({
      type: RESET_VIDEOGAMES
    });
  };
};

export const filterByGenre = (genre) => (dispatch, getState) => {
  let filterByOrigin = getState().filterByOrigin;
  let videogames = getState().videogames;
  if (filterByOrigin !== 'All') videogames = videogames.filter((g) => (g.origin) === filterByOrigin);
  if(genre !== 'All') videogames = videogames.filter((g) => (g.genres).includes(genre));
  dispatch({
    type: FILTER_BY_GENRE,
    payload: {
      genre,
      videogames,
    },
  });
};

export const filterByOrigin = (origin) => (dispatch, getState) => {
  let filterByGenre = getState().filterByGenre;
  let videogames = getState().videogames;
  if (filterByGenre !== 'All') videogames = videogames.filter((g) => (g.genres).includes(filterByGenre));
  if (origin !== 'All') videogames = videogames.filter((g) => g.origin === origin);
  dispatch({
    type: FILTER_BY_ORIGIN,
    payload: {
      origin,
      videogames,
    },
  });
};

export const orderAsc = (type) => (dispatch, getState) => {
  const filterByGenre = getState().filterByGenre;
  const filterByOrigin = getState().filterByOrigin;
  const videogames = getState().videogames;
  const filteredVideogames = getState().filteredVideogames;
  if (filterByGenre === 'All' && filterByOrigin === 'All') {
    if (type === NAME_ASC) {
      const videogamesOrdered = videogames.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
      });
      
      dispatch({
        type: ORDER_NAME_ASC_ALL,
        payload: {
          videogamesOrdered,
          name: type,
        },
      });
      if (type === RATING_ASC) {
        const videogamesOrdered = videogames.sort(
          (a, b) => a.rating - b.rating
        );
        dispatch({
          type: ORDER_RATING_ASC_ALL,
          payload: {
            videogamesOrdered,
            name: type,
          },
        });
      }
    }
  } else {
    if (type === RATING_ASC) {
      const videogamesOrdered = filteredVideogames.sort(
        (a, b) => a.rating - b.rating
      );
      dispatch({
        type: ORDER_RATING_ASC,
        payload: {
          videogamesOrdered,
          name: type,
        },
      });
    }
    if (type === NAME_ASC) {
      const videogamesOrdered = filteredVideogames.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
      });
      dispatch({
        type: ORDER_NAME_ASC,
        payload: {
          videogamesOrdered,
          name: type,
        },
      });
    }
  }
};

export const orderDesc = (type) => (dispatch, getState) => {
  const filterByGenre = getState().filterByGenre;
  const filterByOrigin = getState().filterByOrigin;
  const videogames = getState().videogames;
  const filteredVideogames = getState().filteredVideogames;
  
    if (filterByGenre === 'All' && filterByOrigin === 'All') {
      if (type === RATING_DESC) {
        const videogamesOrdered = videogames.sort(
          (a, b) => b.rating - a.rating
        );
        dispatch({
          type: ORDER_RATING_DESC_ALL,
          payload: {
            videogamesOrdered,
            name: type,
          },
        });
      }
      if (type === NAME_DESC) {
        const videogamesOrdered = videogames.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
  
          return 0;
        });
        dispatch({
          type: ORDER_NAME_DESC_ALL,
          payload: {
            videogamesOrdered,
            name: type,
          },
        });
      }
    } else {
      if (type === RATING_DESC) {
        const videogamesOrdered = filteredVideogames.sort(
          (a, b) => b.rating - a.rating
        );
        dispatch({
          type: ORDER_RATING_DESC,
          payload: {
            videogamesOrdered,
            name: type,
          },
        });
      }
      if (type === NAME_DESC) {
        const videogamesOrdered = filteredVideogames.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
  
          return 0;
        });
        dispatch({
          type: ORDER_NAME_DESC,
          payload: {
            videogamesOrdered,
            name: type,
          },
        });
      }
    }
  };
  