import React from 'react';
import GameCard from '../components/GameCard';
import NotFound from '../components/NotFound';
import s from './Videogame.module.css'

export default function Videogame({videogames}) {
  return (
    <div className={s.container}>
      <div className={s.cards }>
        {videogames.length ? (videogames.map((game) => <GameCard game={game} key={game.id} />)
        ) : <NotFound />}
      </div>
    </div>
  );
}
