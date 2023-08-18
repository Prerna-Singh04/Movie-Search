import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";

export const CardComponent = ({ seriesList }) => {
  const [fevList, setFevList] = useState([]);

  const isElementinFavList = (elem) => {
    let isElementPresent = false;
    for (let i = 0; i < fevList.length; i++) {
      const currentObj = fevList[i];
      if (currentObj.imdbID === elem.imdbID) {
        isElementPresent = true;
        break;
      }
    }
    return isElementPresent;
  };

  useEffect(() => {
    if(fevList.length){
      if(localStorage.getItem("fevMovies") === null){
        localStorage.setItem("fevMovies", JSON.stringify(fevList));
      }else{
        let clientFevMovieList = JSON.parse(localStorage.getItem("fevMovies"));
        clientFevMovieList= [...clientFevMovieList,...fevList]
        let uniqueArr = [...new Map(clientFevMovieList.map((m) => [m.imdbID, m])).values()];
        localStorage.setItem('fevMovies',JSON.stringify(uniqueArr))
      }
    }
  }, [fevList]);

  const handleFev = (elem) => {
    if (!fevList.length) {
      setFevList([elem]);
    }

    if (fevList.length) {
      const result = isElementinFavList(elem);
      if (!result) {
        const newArr = [...fevList, elem];
        setFevList(newArr);
      }
    }
  };

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4} className="g-6">
        {seriesList &&
          seriesList.map((elem, idx) => (
            <Col key={idx} style={{ marginTop: "25px" }}>
              <Card style={{ width: "18rem" }}>
                {elem.Poster && elem.Poster !== "N/A" ? (
                  <Card.Img
                    variant="top"
                    src={elem.Poster}
                    width="100%"
                    style={{ height: "350px" }}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src="https://media.istockphoto.com/id/1092112634/photo/blue-balloon-with-a-sad-face.jpg?s=612x612&w=0&k=20&c=sZtDxtdIIss-TGWL2FlerIP-k8n6qvnmT1-LMXQ3itI="
                    width="100%"
                    style={{ height: "350px" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{elem.Title}</Card.Title>
                  {elem.Released ? (
                    <Card.Text>
                      <b>Released:</b> {elem.Released}
                    </Card.Text>
                  ) : (
                    <Card.Text>
                      <b>Year:</b> {elem.Year}
                    </Card.Text>
                  )}
                  {elem.imdbRating ? (
                    <Card.Text>
                      <b>imdbRating:</b> {elem.imdbRating}
                    </Card.Text>
                  ) : null}
                  <Card.Text>
                    <b>Type:</b> {elem.Type}
                  </Card.Text>
                  {elem.Runtime ? (
                    <Card.Text>
                      <b>Duration:</b> {elem.Runtime}
                    </Card.Text>
                  ) : null}
                  <Button variant="primary" onClick={() => handleFev(elem)}>
                    Add to Favourities
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};
