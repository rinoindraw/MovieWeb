import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import Header from "../../components/header/Header";


const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let isMounted = true; // Menambahkan flag isMounted

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=452e1f972d2e508c37b9754d09558910&language=en-US&page=${pageNumber}`
        );

        if (!isMounted) {
          return; // Jika komponen telah di-unmount, hentikan pembaruan state
        }

        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Fungsi cleanup yang akan dijalankan saat komponen di-unmount
    return () => {
      isMounted = false; // Set isMounted menjadi false saat komponen di-unmount
    };
  }, [type, pageNumber]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <>
    <Header />
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards movie={movie} key={movie.id} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={previousPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
    </>

  );
};

export default MovieList;
