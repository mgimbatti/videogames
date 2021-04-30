import React from "react";
import s from './Pagination.module.css';

export const Pagination = ({ videogamesPerPage, totalVideogames, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
    //The Math.ceil () function returns the closest integer greater than or equal to a given number.
    pageNumbers.push(i); // Number of pages
  }

  return (
    <nav className={s.pagination}>
      <ul className={s.pages}>
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              onClick={(e) => paginate(e, num)} className={s.btn}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};