import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import RecommendedMovies from "./components/RecommendedMovies";
import MovieDetail from "./components/MovieDetail";
import axios from 'axios';


const App = () => {
  const [movies, setmovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);


  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4ea1b9a1`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setmovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const moviefavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    setFavourites(moviefavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);

    // Fetch recommended movies based on the selected movie (replace with your API endpoint)
    axios.get(`your-recommended-movies-api-endpoint/${movie.id}`)
      .then((response) => {
        setRecommendedMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (

    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <MovieDetail selectedMovie={selectedMovie} />
        <RecommendedMovies recommendedMovies={recommendedMovies} />
      </div>

      <div className="set">
        <MovieList
          movies={movies}
          onMovieSelect={handleMovieSelect}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>

      <div className="set">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};
export default App;
