import React from "react"
import UploadImage from "./components/UploadImage"
import { Container, Row, Col } from "react-bootstrap"
import DisplayThumbnails from "./components/DisplayThumbnails"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import ViewImage from "./components/ViewImage"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Container fluid className="w-75">
        <Row>
          <Col>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="p-5 display-4 text-center">My Photo Album</h1>
            </Link>
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
