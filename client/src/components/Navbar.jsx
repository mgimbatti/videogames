import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

export default function NavBar() {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setName('')
  }

  return (
    <div className={s.navBar}>
      <div>
        <Link to='/home'>
          <h2>Home</h2>
        </Link>
      </div>
      <div>
        <Link to='/about'>
          <h2>About</h2>
        </Link>
      </div>
      <div>
        <Link to='/add'>
          <h2>Add</h2>
        </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search videogame...'
          type='text'
          className={s.input}
        ></input>
        <Link to={`/videogames/${name}`}>
          <button type='submit' className={s.btn}>Go
          </button>
        </Link>
      </form>
    </div>
  );
}
