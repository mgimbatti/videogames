import React from 'react';
import s from './Loading.module.css'
import loading_gif from '../resources/mario_loading.gif'

export default function Loading() {
    return (
        <div className={s.loading}>
            <div className={s.image}>
            <img src={loading_gif} alt="Loading..."></img>
            </div>
            <h2>Loading...</h2>
        </div>
    )
}

