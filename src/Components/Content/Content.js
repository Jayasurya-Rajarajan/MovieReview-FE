import React, { useEffect, useState } from "react";
import Movies from "../Movies/Movies";
import "../Movies/Movies.css";
import "./Content.css";
import axios from "axios";
import { Button, Rating } from "@mui/material";
import TextField from "@mui/material/TextField";
import Reviews from "../Reviews/Reviews";

const Content = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const addMovieClickHandler = () => {
    setShowModal(true);
  };

  const postMovieDeleteHandler = (movieId) => {
    const moviesState = [...movies];
    const transformedArray = moviesState.filter((movie) => { return movie.id !== movieId });
    setMovies(transformedArray);

  }

  const saveMovieHandler = () => {
    console.log({
      movieName,
      movieRating,
    });

    let data = JSON.stringify({
      MovieName: movieName,
      MovieRating: movieRating,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://localhost:44320/AddMovie",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data.status){
            const addedMovie = {
                movieName: response.data.data.movieparam.MovieName,
                id: response.data.data.movieparam.Id,
                rating: response.data.data.movieparam.MovieRating,
            }
            setMovies([addedMovie, ...movies])
            setMovieName("");
            setMovieRating(0);
            closeModalHandler()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addMovieBody = (
    <div className="add__movie__body__parent">
      <div className="add__movie__body">
        <TextField
          id="standard-basic"
          value={movieName}
          onChange={(event) => setMovieName(event.target.value)}
          label="Movie Name"
          variant="standard"
        />
        <Rating
          name="size-small"
          defaultValue={movieRating}
          onChange={(event) => setMovieRating(event.target.value)}
          size="small"
        />
        <Button onClick={saveMovieHandler}>Save</Button>
      </div>
    </div>
  );

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://localhost:44320/GetMovies",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.status));
        if (response.data.status) {
          if (response.data.data.movies.length > 0) {
            const transformedMovies = response.data.data.movies.map((movie) => {
              return {
                movieName: movie.MovieName,
                id: movie.Id,
                rating: movie.MovieRating,
              };
            });
            setMovies(transformedMovies);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <section className="content__section">
        <div className="content__add__movie">
          <Button onClick={addMovieClickHandler}>Add movie</Button>
        </div>
        <div className="content__movies__section">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Movies
                key={movie.id}
                movieName={movie.movieName}
                id={movie.id}
                rating={movie.rating}
                postMovieDeleteHandler={postMovieDeleteHandler}
              />
            ))
          ) : (
            <h3>No movies found</h3>
          )}
        </div>
      </section>
      <Reviews
        handleCloseReviewModal={closeModalHandler}
        showReviewModal={showModal}
        body={addMovieBody}
        maxWidth="xs"
        title="Add movie"
      />
    </>
  );
};

export default Content;
