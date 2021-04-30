import React, {useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {getVideogames, resetStore} from '../actions/index'
import Videogame from '../components/Videogame';
import { Pagination } from '../components/Pagination';
import  Filter  from "../components/Filter";
import s from './Home.module.css'
import Loading from '../components/Loading';

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogames)
    const filteredVideogames = useSelector((state) => state.filteredVideogames);
    const filterByGenre = useSelector((state) => state.filterByGenre);
    const filterByOrigin = useSelector((state) => state.filterByOrigin);
    const orderBy = useSelector((state) => state.orderBy);
    const loading = useSelector((state)=> state.loading)
    let allVideogames;

    
    useEffect(() => {
      // to avoid dispatching action if videogames array is not modified
      if (!videogames.length < 100) {
        dispatch(getVideogames())   
      }        
    }, [])

    filterByGenre === "All" && filterByOrigin === 'All'
      ? (allVideogames = videogames)
      : (allVideogames = filteredVideogames);
  
 
    function paginate(e, num) {
      e.preventDefault();
      setPage(num);
    }
  
    const [page, setPage] = useState(1);
    const [videogamesPerPage] = useState(9);
  
    // index of the last game of each page
    let indexLastPage = page * videogamesPerPage;
    // index of the first element of each page
    let indexFirtsPage = indexLastPage - videogamesPerPage;
    // videogames of the current page
    let currentPage = allVideogames.slice(indexFirtsPage, indexLastPage);
  
    return (
      <div>
          {loading ? (
            <Loading />
          ) : (
              <div className={s.home}>
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
    );
  }
  

  