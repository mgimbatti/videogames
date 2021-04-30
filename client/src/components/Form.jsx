/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVideogame, getGenres, getPlatforms } from "../actions/index";
import s from './Form.module.css';


function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genres);
  const platforms = useSelector((store) => store.platforms);

  const [state, setState] = useState({
    name: "",
    description: "",
    released: null,
    rating: null,
    genres: [],
    platforms: [],
  });
  
  const [error, setError] = useState({
      warning: 'Name and description must be filled in',
      disabled:true 
   })


  function validate() {
    let valid = true;
    if (!state.name || !state.description) valid = false;
    if (valid) {
      setError({
        warning: '',
        disabled: false
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    //If change is on Genres or Platforms, i need to concatenate with previous state values.
    if (name === "genres" || name === "platforms") {
      const arr = state[name];
      setState({
        ...state,
        [name]: arr.concat(value),
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
    //Calls validate function
    validate();
  };

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      name: state.name,
      description: state.description,
      released: state.released,
      rating: state.rating,
      genres: [...new Set(state.genres)],
      platforms: [...new Set(state.platforms)],
    };

    dispatch(addVideogame(obj));
    e.target.reset();
    alert('New videogame added to DB');

    setState({
      name: "",
      description: "",
      released: null,
      rating: null,
      genres: [],
      platforms: [],
    });

    setError({
      warning: 'Name and description must be filled in',
      disabled:true 
    })
  };

  return (
    <div className={s.formContainer}>
      <header>
        <h1>Add a videogame</h1>
      </header>
      <form
        className={s.form}
        onChange={(e) => handleChange(e)}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <div className={s.inputContainer}>
            <label className={s.label}>Name</label>
            <input
              type="text"
              name="name"
              value={state.name}
              ></input>
          </div>
          <div className={s.inputContainer}>
            <label className={s.label}>Description</label>
            <textarea
              type="text"
              name="description"
              value={state.description}
            ></textarea>
          </div>
          {error.warning? <div className={s.error}>{error.warning}</div> : null}
          <div className={s.inputContainer}>
            <label className={s.label}>Released</label>
            <input
              type="date"
              name="released"
              value={state.released}
            ></input>
          </div>
          <div className={s.inputContainer}>
            <label className={s.label}>Rating</label>
            <input
              type="number"
              name="rating"
              value={state.rating}
            ></input>
          </div>
       
          <div className={s.inputContainer}>
            <label className={s.label}>Genres</label>
            <div>
              <ul className={s.genres}>
                {genres.map((g) => (
                  <li key={g.name}>
                    <input
                      className="input"
                      type="checkbox"
                      name="genres"
                      value={g.name}
                    ></input>
                    <label name={g} className={s.lilabel}>{g.name}</label>
                  </li>
                ))}
              </ul>
            </div>
            </div> 
            <div className={s.inputContainer}>
            <label className={s.label}>Platforms</label>
            <div className={s.pContainer}>
              <ul className={s.platforms}>
                {platforms.map((p) => (
                  <li  key={p.name}>
                    <input
                      type="checkbox"
                      name="platforms"
                      value={p.name}
                    ></input>
                    <label name={p}>{p.name}</label>
                  </li>
                ))}
              </ul>
            </div>
            </div>             
             <div>
            <button disabled={error.disabled} className={s.btn} type="submit">
              Add videogame
        </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;