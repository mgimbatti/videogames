import React from 'react';
import s from './About.module.css'
import mario_image from '../resources/mario_about.gif'

export default function About() {
    return (
        <div>
            <div className={s.header}>
                <h1>About</h1>
            </div>
            <div className={s.image}>
                <img src={mario_image} alt='Mario_image' />
            </div>
            <div className={s.text}>
                <h2>This is an app made by Marcos Gimbatti</h2>
            </div>
        </div>
    )
}