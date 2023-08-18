import React, { useEffect, useState } from "react";
import "../sass/movie-search.scss";
import { CardComponent } from "./card";
import { Button, Container } from "react-bootstrap";
export const MovieSearchBar = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [searchBytitle, setTitle] = useState({
    title: "",
    type: "movie",
  });
  const [errMsg, setErrMsg] = useState("");

  const options = [
    { value: "movie", label: "Movie" },
    { value: "series", label: "Series" },
    { value: "episodes", label: "Episodes" },
  ];

  const handleChange = (name,value) => {
    setTitle({...searchBytitle,[name]:value});
  };

  const handleSearch = () => {
    async function fetchDatas() {
      fetch(
        `https://www.omdbapi.com/?s=${searchBytitle.title}&type=${searchBytitle.type}&page=1&apikey=d7d3d042`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.Episodes) {
            setSeriesList(data.Episodes);
          }
          if (data.Search) {
            setSeriesList(data.Search);
          } else {
            if (typeof data == "object" && data.Title) {
              setSeriesList([data]);
            } else {
              setErrMsg(data.Error);
            }
          }
        })
        .catch((error) => console.error(error));
    }
    if (searchBytitle.title) {
      fetchDatas();
    } else {
      alert("Please enter the movie name ");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 3000);
  }, [seriesList, errMsg]);

  useEffect(() => {
    async function fetchDatas() {
      fetch("https://www.omdbapi.com/?s=Batman&page=2&apikey=d7d3d042")
        .then((response) => response.json())
        .then((data) => {
          if (data.Episodes) {
            setSeriesList(data.Episodes);
          } else {
            setSeriesList(data.Search);
          }
        })
        .catch((error) => console.error(error));
    }
    fetchDatas();
  }, []);
  return (
    <>
      <div className="movie_search">
        <Container className="text-center abc">
          <input
            name="title"
            type="text"
            placeholder="Enter details"
            className="movie_search_input"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />

          <select
            name="type"
            defaultValue="all"
            className="movie_type_dropdown"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            <option className="optionGroup" defaultValue="all" disabled>
              Choose one
            </option>
            {options.map((elem, index) => {
              return (
                <option defaultValue={elem.value} key={index} value={elem.value}>
                  {elem.label}
                </option>
              );
            })}
          </select>

          <Button
            type="search"
            className="movie_search_control"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Container>
      </div>
      <p className="text-danger text-center">{errMsg}</p>
      <CardComponent seriesList={seriesList} />
    </>
  );
};
