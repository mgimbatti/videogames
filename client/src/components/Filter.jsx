import {NAME_ASC, NAME_DESC, RATING_ASC, RATING_DESC, EXISTING, NEW} from '../actions/index' 

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, filterByGenre, filterByOrigin, orderAsc, orderDesc } from '../actions/index';
import s from './Filter.module.css'


export default function Filter() {
  const dispatch = useDispatch()
  const genres = useSelector((store) => store.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, []);


  const handleGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
  };

 
  const handleOrigin = (e) => {
    dispatch(filterByOrigin(e.target.value));
  };


  const handleOrder = (e) => {
    if (e.target.value === NAME_ASC || e.target.value === RATING_ASC) {
      dispatch(orderAsc(e.target.value));
    } else {
      dispatch(orderDesc(e.target.value));
    }
  };

  return (
    <div className={s.filter}>
      <div className={s.criteria}>
        <p>Filter by Genre</p>
        <select onChange={(e) => handleGenre(e)} className={s.select}>
          <option default>All</option>
          {genres.map((g) => (
            <option value={g.name} key={g.name}>{g.name}</option>
          ))}
        </select>
      </div>
      <div className={s.criteria}>
        <p>Filter by Origin</p>
        <select onChange={(e) => handleOrigin(e)} className={s.select}>
          <option default>All</option>
          <option value={EXISTING}>Existing videogames</option>
          <option value={NEW}>New videogames</option>
        </select>
      </div>
      <div className={s.criteria}>
      <p>Order</p>
      <select onChange={(e) => handleOrder(e)} className={s.select}>
        <option default>Select</option>
        <option value={NAME_ASC}>Alphabetically (A-Z)</option>
        <option value={NAME_DESC}>Alphabetically (Z-A)</option>
        <option value={RATING_ASC}>Rating (Best - Worst)</option>
        <option value={RATING_DESC}>Rating (Worst - Best)</option>
      </select>
      </div>
    </div>
  );
}
