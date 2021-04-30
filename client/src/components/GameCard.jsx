import React from "react";
import { Link } from 'react-router-dom';
import s from './GameCard.module.css'

export default function GameCard({ game }) {
    return (
        <div className={s.card}>
            <div className={s.flipcard}>
                <div className={s.front}>
                    <div className={s.image}>
                        <img src={game.image} alt={game.name} />
                        <div className={s.nameFront}>{game.name}</div>
                    </div>
                </div>
                <div className={s.back}>
                    <div className={s.nameBack}>{game.name}</div>
                    <div>{game.genres.join('-')}</div>
                    <div>{game.platforms}</div>
                    <Link to={`/videogame/${game.id}`}>
                        <button type='submit' className={s.btn}>More info</button>
                    </Link>
                </div>

            </div>

        </div>
    )
}