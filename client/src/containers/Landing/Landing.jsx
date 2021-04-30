
import { Link } from 'react-router-dom';
import s from './Landing.module.css'

function Landing() {
  return (

    <div className={s.landing}>
      <div className={s.title}>
        <h1> Welcome to</h1>
        <h2>my videogame App</h2>
        <Link to='/home'>
          <button type='submit' className={s.btn}>Start</button>
        </Link>
      </div>
    </div>

  );
}


export default Landing;
