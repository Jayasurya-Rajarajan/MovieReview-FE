import React, { useState } from "react";
import "./Movies";
import Leo from "../../Assets/Leo.jpg";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Reviews from "../Reviews/Reviews";
import ReviewCard from "../Reviews/ReviewCard";
import defaultPoster from "../../Assets/defaultPoster.jpg";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";

const Movies = (props) => {
  const [showReview, setShowReview] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showUpdateReviewModal, setShowUpdateReviewModal] = useState(false);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [selectedReviewDetail, setSelectedReviewDetail] = useState({});

  const handleCloseAddReviewModal = () => {
    setShowAddReviewModal(false);
  };

  const handleOpenAddReviewModal = () => {
    setShowAddReviewModal(true);
  };

  const handleOpenUpdateReviewModal = () => {
    setShowUpdateReviewModal(true);
  };

  const handleCloseUpdateReview = () => {
    setShowUpdateReviewModal(false);
  };

  const reviewUpdateClickHandler = (reviewId, movieId) => {
    const detail = {
      movieId: movieId,
      reviewId: reviewId
    }
    setSelectedReviewDetail(detail)
    const selectedReview = movieReviews.find((review) => {
      return review.id === reviewId && review.movieId === movieId;
    });
    handleOpenUpdateReviewModal(true);
    setComment(selectedReview.comments);
    setEmail(selectedReview.email);
  };

  const formatDate = (date) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate.replace(",", "");
  };

  const handleOpenReviewModal = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://localhost:44320/GetReviews?movieId=${props.id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          const reviews = response.data.data.reviews.map((review) => {
            return {
              id: review.Id,
              movieId: review.MovieId,
              email: review.Email,
              createdDate: review.CreatedOn,
              comments: review.Comments,
            };
          });
          console.log(reviews);
          setMovieReviews(reviews);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const addReviewHandler = () => {
    handleOpenAddReviewModal();
  };

  const updateReviewHandler = () => {
    let data = JSON.stringify({
      Id: selectedReviewDetail.reviewId,
      MovieId: selectedReviewDetail.movieId,
      Comments: comment,
    });

    console.log(selectedReviewDetail)

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://localhost:44320/UpdateReviews",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data.status) {
          const updatedReviewIndex = movieReviews.findIndex((review) =>
           { return response.data.data.review.Id === review.id && response.data.data.review.MovieId === review.movieId });
          const updatedReview = movieReviews.find((review) =>
           { return response.data.data.review.Id === review.id && response.data.data.review.MovieId === review.movieId })
          updatedReview.comments = comment;
          let reviewArr = [...movieReviews];
          reviewArr[updatedReviewIndex] = updatedReview;
          setMovieReviews([...reviewArr]);
          setComment("");
          setEmail("");
          handleCloseUpdateReview();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteReviewHandler = (reviewId, movieId) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://localhost:44320/DeleteReview?movieId=${movieId}&reviewId=${reviewId}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          console.log(movieReviews)
          const filteredReviews = movieReviews.filter((movie) => {
            return (
              movie.id !== response.data.data.review.Id
            );
          });
          console.log(filteredReviews)
          setMovieReviews(filteredReviews);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveNewReviewHandler = () => {
    let data = JSON.stringify({
      Comments: comment,
      Email: email,
      MovieId: props.id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://localhost:44320/CreateReviews",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          const addedReview = {
            id: response.data.data.reviewParam.Id,
            movieId: response.data.data.reviewParam.MovieId,
            email: response.data.data.reviewParam.Email,
            createdDate: response.data.data.reviewParam.CreatedOn,
            comments: response.data.data.reviewParam.Comments,
          };
          setMovieReviews([addedReview, ...movieReviews]);
          setEmail("");
          setComment("");
          handleCloseAddReviewModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMoviesHandler = (event) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://localhost:44320/DeleteMovie?id=${props.id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          props.postMovieDeleteHandler(props.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addReviewBody = (
    <>
      <div className="add__review__body">
        <TextField
          id="standard-basic"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email or Name"
          variant="standard"
        />
        <Textarea
          color="neutral"
          minRows={2}
          variant="outlined"
          placeholder="Write review"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button variant="outlined" onClick={saveNewReviewHandler}>
          Add review
        </Button>
      </div>
    </>
  );

  const updateReviewBody = (
    <>
      <div className="add__review__body">
        <TextField
          disabled
          id="standard-basic"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email or Name"
          variant="standard"
        />
        <Textarea
          color="neutral"
          minRows={2}
          variant="outlined"
          placeholder="Write review"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button variant="outlined" onClick={updateReviewHandler}>
          Update review
        </Button>
      </div>
    </>
  );

  const reviewCardBody = (
    <>
      <div className="reviews__add__reviews">
        <Button onClick={addReviewHandler}>Add reviews</Button>
      </div>
      <div>
        {movieReviews.length > 0 ? (
          movieReviews.map((movie) => {
            return (
              <div className="movie__reviews__card__wrapper">
                <ReviewCard
                  key={movie.id}
                  id={movie.id}
                  movieId={props.id}
                  comments={movie.comments}
                  name={movie.email}
                  date={formatDate(movie.createdDate)}
                  deleteReviewHandler={deleteReviewHandler}
                  reviewUpdateClickHandler={reviewUpdateClickHandler}
                />
              </div>
            );
          })
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </>
  );

  return (
    <>
      <section className="movies__wrapper">
        <div>
          <IconButton onClick={deleteMoviesHandler} title="Delete movie">
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
        <section className="movies__parent">
          <div className="movie__poster">
            <img
              className={`movie__poster__img ${
                showReview ? "poster__hover" : ""
              }`}
              onMouseEnter={() => setShowReview(true)}
              onMouseLeave={() => setShowReview(false)}
              src={props.moviePoster ? props.moviePoster : defaultPoster}
            />
            {showReview && (
              <Button
                onClick={handleOpenReviewModal}
                onMouseEnter={() => setShowReview(true)}
                onMouseLeave={() => setShowReview(false)}
                variant="contained"
                endIcon={<RateReviewIcon />}
              >
                Reviews
              </Button>
            )}
          </div>
          <div className="movie__name">
            <span className="movie__title">
              <b>{props.movieName}</b>
            </span>
          </div>
          <div className="movie__rating">
            <span className="movie__rating__span">
              <Rating
                readOnly
                name="Rating"
                value={props.rating}
                size="small"
              />
            </span>
          </div>
        </section>
      </section>
      <Reviews
        handleOpenReviewModal={handleOpenReviewModal}
        handleCloseReviewModal={handleCloseReviewModal}
        showReviewModal={showReviewModal}
        body={reviewCardBody}
        maxWidth="xl"
        title="Reviews"
      />
      <Reviews
        handleOpenReviewModal={handleOpenAddReviewModal}
        handleCloseReviewModal={handleCloseAddReviewModal}
        showReviewModal={showAddReviewModal}
        body={addReviewBody}
        maxWidth="xs"
        title="Add reviews"
      />
      <Reviews
        handleOpenReviewModal={handleOpenUpdateReviewModal}
        handleCloseReviewModal={handleCloseUpdateReview}
        showReviewModal={showUpdateReviewModal}
        body={updateReviewBody}
        maxWidth="xs"
        title="Add reviews"
      />
    </>
  );
};

export default Movies;
