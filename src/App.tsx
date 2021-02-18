import React from "react"
import UploadImage from "./components/UploadImage"
import { Container, Row, Col } from "react-bootstrap"
import DisplayThumbnails from "./components/DisplayThumbnails"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import ViewImage from "./components/ViewImage"
import ThisComponentIsAJoke from "./components/Joke"

const App: React.FC = () => {
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
            <ThisComponentIsAJoke />
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
