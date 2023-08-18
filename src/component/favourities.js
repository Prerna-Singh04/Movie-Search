import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { MovieSearchHeader } from './common-component/header';


export const UserFavouritList = () => {

  const [fevList, setFevList] = useState([]);

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('fevMovies'));
    setFevList(data);
  },[])

  const handelFev = (id) => {
    let newdata = fevList.filter(elem => {
      if(elem.imdbID !== id){
        return elem
      }
    })
    setFevList(newdata)
  }

  useEffect(()=>{
    localStorage.setItem('fevMovies',JSON.stringify(fevList));
  },[fevList])

  return (
    <div>
      <MovieSearchHeader />
      <Container>
        <Row xs={1} md={2} lg={3} xl={4} className="g-6">
          {fevList.map((elem,idx)=>{
            return(
              <Col key={idx} style={{ marginTop: "25px" }}>
                <Card style={{ width: "18rem" }}>
                  {elem.Poster && elem.Poster !== 'N/A'?<Card.Img variant="top" src={elem.Poster} width='100%' style={{height: "350px"}}/>:<Card.Img variant="top" src='https://media.istockphoto.com/id/1092112634/photo/blue-balloon-with-a-sad-face.jpg?s=612x612&w=0&k=20&c=sZtDxtdIIss-TGWL2FlerIP-k8n6qvnmT1-LMXQ3itI=' width='100%' style={{height: "350px"}}/>}
                  <Card.Body>
                    <Card.Title>{elem.Title}</Card.Title>
                    {elem.Released?<Card.Text><b>Released:</b> {elem.Released}</Card.Text>:<Card.Text><b>Year:</b> {elem.Year}</Card.Text>}
                    {elem.imdbRating?<Card.Text><b>imdbRating:</b> {elem.imdbRating}</Card.Text>:null}
                    <Card.Text><b>Type:</b> {elem.Type}</Card.Text>
                    {elem.Runtime?<Card.Text><b>Duration:</b> {elem.Runtime}</Card.Text>:null}
                    <Button variant="primary" onClick={()=>handelFev(elem.imdbID)}>Remove from Favourities</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}
