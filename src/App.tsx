import React, { useEffect, useState } from "react"
import UploadImage from "./components/UploadImage"
import { Container, Row, Col } from "react-bootstrap"
import DisplayThumbnails from "./components/DisplayThumbnails"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import ViewImage from "./components/ViewImage"
import { Joke, getJoke } from "./api/backend"

const App: React.FC = () => {
  const [joke, setJoke] = useState<Joke>({ text: "Loading a joke ..." })

  useEffect(() => {
    const getNewJoke = async () => {
      try {
        const j = await getJoke()
        setJoke(j)
      } catch (err) {
        setJoke({ text: "Implement /joke endpoint to view a joke here" })
      }
    }

    getNewJoke()
  }, [])

  return (
    <BrowserRouter>
      <Container fluid className="w-75">
        <Row>
          <Col>
            <Link to="/">
              <h1 className="pt-5 pl-5 pr-5 display-4 text-center">
                My Photo Album
              </h1>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <blockquote className="blockquote text-center pb-5">
              <p>{joke ? joke.text : ""}</p>
            </blockquote>
          </Col>
        </Row>
        <Switch>
          <Route path="/" exact>
            <Row>
              <Col>
                <UploadImage />
              </Col>
            </Row>
            <Row>
              <Col>
                <DisplayThumbnails />
              </Col>
            </Row>
          </Route>
          <Route path="/photo/:photoId">
            <Row>
              <Col>
                <ViewImage />
              </Col>
            </Row>
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
