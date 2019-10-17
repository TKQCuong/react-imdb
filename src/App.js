import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import Carousel from "react-bootstrap/Carousel";
// import Logo from "./icon-popularity.png";
// import Logo from "./breaking-bad.jpg";
import "./App.css";


function App() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const api = "3da1045d9dcc20051351c38bd3fafa77";
    let response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api}`
    );
    let data = await response.json();
    setMovie(data.results);
    console.log("data", data);
  };

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

        <Navbar bg="dark" variant="dark" className="sticky-top">
          <Navbar.Brand href="#home" id="scroll">IMDB</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
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
          <h1>Social media</h1>
        </div>
      </div>

      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default App;
