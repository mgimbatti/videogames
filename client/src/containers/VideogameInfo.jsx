import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { getVideogameById, resetStore } from '../actions/index';
import s from './VideogameInfo.module.css'

export default function VideogameDetail({id}) {
    const dispatch = useDispatch();
    const videogame = useSelector((store) => store.videogameById);

    useEffect(()=> {
      dispatch(getVideogameById(id))
      dispatch(resetStore())
    }, []);

  return (
    <div>
      <div className={s.header}>
        <h1>{videogame.name}</h1>
      </div>
      <div className={s.container}>
        <img src={videogame.image} alt={videogame.name} className={s.image} />
        <div className={s.text}>
          <h2 className={s.labels}>Description</h2>
          <p>{videogame.description}</p>
        </div>
        <div>
          <h2 className={s.labels}>Released</h2>
          <p>{videogame.released}</p>
        </div>
        <div>
          <h2 className={s.labels}>Genres</h2>
          {videogame.genres && <p>{videogame.genres.join(', ')}</p>}
        </div>
        <div>
          <h2 className={s.labels}>Platforms</h2>
          {videogame.platforms && <p>{videogame.platforms.join(', ')}</p>}
          <div>
            <h2 className={s.labels}>Rating</h2>
            <p>{videogame.rating}</p>
            <div>
              <Link to='/home'>
                <button type='submit' className={s.btn}>Go Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}