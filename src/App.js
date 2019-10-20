import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";
import {
  Carousel,
  Card,
  CardDeck,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown
} from "react-bootstrap";

import "./App.css";

function App() {
  //useState
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);

  // const [genre, setGenre] = useState([]);
  // const [clone, setClone] = useState([])
  console.log("page", page);

  //useEffect
  useEffect(() => {
    getMovie();
    // getGenre();
  }, []);
  console.log("movie", movie);

  //API movies
  const getMovie = async () => {
    const api = "3da1045d9dcc20051351c38bd3fafa77";
    let response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api}&page=${page}`
    );
    const data = await response.json();
    const newMovie = movie.concat(data.results);
    setMovie(newMovie);
    // setClone(newMovie);
    setPage(page + 1);
  };

  //API categories
  // const getGenre = async () => {
  //   const api = "3da1045d9dcc20051351c38bd3fafa77";
  //   let movieGenre = await fetch(
  //     `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}&page=${page}`
  //   );
  //   const data = await movieGenre.json();
  //   setGenre(data.genres);
  // };

  // const genreSearch = () => {
  //   const newGenre = clone.filter(el => el.genres.name)
  //   setMovie (newGenre)
  // };

  //Return HTML
  return (
    <div className="main-content">
      <div className="header">
        <div className="preview">
          <Carousel>
            <Carousel.Item>
              <iframe
                width="460"
                height="220"
                src="https://www.youtube.com/embed/1JLUn2DFW4w?start=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Carousel.Item>
            <Carousel.Item>
              <iframe
                width="460"
                height="220"
                src="https://www.youtube.com/embed/zAGVQLHvwOY"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="nav-bar">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="IMDB">
              IMDb
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#features">Movies & Showtimes</Nav.Link>
                <Nav.Link href="#pricing">Celebs & Photos</Nav.Link>
                <Nav.Link href="#pricing">News & Communities</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">IMDb Pro</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Help
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>

      <div className="second-div">
        <div className="movie-list">
          {movie &&
            movie.map(item => {
              return (
                <CardDeck className="card-deck">
                  <Card className="movie-card">
                    <Card.Img
                      className="movie-image"
                      variant="top"
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    />
                    <Card.Body>
                      <Card.Title className="movie-title">
                        {item.original_title} (
                        <Moment format="YYYY">{item.release_date}</Moment>)
                      </Card.Title>
                      <div className="popularity">
                        <span className="icon-popularity">
                          {item.popularity}
                        </span>{" "}
                        Popularity
                      </div>

                      <Card.Text className="movie-overview">
                        {item.overview}{" "}
                      </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </Card.Footer> */}
                  </Card>
                </CardDeck>
              );
            })}
        </div>

        <div className="social-media">
          <span className="first-heading">New Movies</span>
          <br></br>
          <span className="second-heading">In Theaters</span>
        </div>
      </div>

      <div className="next-page">
        <button className="myButton" onClick={() => getMovie()}>
          See more movies in theaters
        </button>
      </div>
    </div>
  );
}

export default App;
