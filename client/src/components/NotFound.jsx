import React from "react";
import s from './NotFound.module.css';
import mario_gif from '../resources/mario_notfound.gif'

const NotFound = () => {
  return (
    <div className={s.notFound}>
      <h1>We couldn't find your videogame</h1>
      <h3>Try another one!</h3>
      <img className={s.image} src={mario_gif} alt="Try again!"></img>
    </div>
  )
}
export default NotFound;

