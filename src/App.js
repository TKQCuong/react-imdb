import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";
import { Carousel, Card, CardDeck, Navbar, Nav } from "react-bootstrap";
import "./App.css";

function MovieCard(props) {
  return (
    <CardDeck className="card-deck">
      <Card className="movie-card">
        <Card.Img
          className="movie-image"
          variant="top"
          src={`https://image.tmdb.org/t/p/original/${props.item.poster_path}`}
        />
        <Card.Body>
          <Card.Title className="movie-title">
            {props.item.original_title} (
            <Moment format="YYYY">{props.item.release_date}</Moment>)
          </Card.Title>
          <div className="popularity">
            <span className="icon-popularity">{props.item.popularity}</span>{" "}
            Popularity
          </div>

          <Card.Text className="movie-overview">{props.item.overview} </Card.Text>
        </Card.Body>
      </Card>
    </CardDeck>
  );
}

function App() {
  //useState
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  console.log("page", page);

  //useEffect
  useEffect(() => {
    getMovie();
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
    setPage(page + 1);
  };

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
            movie.map((item) => {
              return <MovieCard item={item}/>
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
