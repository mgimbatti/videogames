import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";

import { getVideogamesByName, resetVideogames, getVideogames } from '../actions/index'
import Videogame from '../components/Videogame';
import { Pagination } from '../components/Pagination';
import Filter from "../components/Filter";
import Loading from '../components/Loading';
import s from './Search.module.css'


function Search() {
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const filterByGenre = useSelector((state) => state.filterByGenre);
  const filterByOrigin = useSelector((state) => state.filterByOrigin);
  const orderBy = useSelector((state) => state.orderBy);
  const videogames = useSelector((state) => state.videogames);
  const loading = useSelector((state)=> state.loading)
  let allVideogames;

  let { name } = useParams()

  filterByGenre === "All" && filterByOrigin === 'All'
    ? (allVideogames = videogames)
    : (allVideogames = filteredVideogames);


  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [videogamesPerPage] = useState(9);

  useEffect(() => {
    dispatch(resetVideogames())
    dispatch(getVideogamesByName(name));
  }, [name]);

  function paginate(e, num) {
    e.preventDefault();
    setPage(num);
  }

  let indexLastPage = page * videogamesPerPage;
  // index of the last element of each page
  let indexFirtsPage = indexLastPage - videogamesPerPage;
  // index of the first element of each page
  let currentPage = allVideogames.slice(indexFirtsPage, indexLastPage);
  // videogames of the current page

  return (
    <div >
    {loading ? (
      <Loading />
    ) : (
      <div className={s.search}> 
        <Filter />
        <Videogame videogames={currentPage} />
        <Pagination
          videogamesPerPage={videogamesPerPage}
          totalVideogames={allVideogames.length}
          paginate={paginate}
        />
      </div>
    )}
    </div>
  )
};

export default Search;