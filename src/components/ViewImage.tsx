import React, { useEffect, useState } from "react"
import {
  Alert,
  Col,
  Container,
  Image,
  Row,
  Form,
  Button,
} from "react-bootstrap"
import { useParams } from "react-router-dom"
import nature from "../assets/nature.jpg"

interface RouteParams {
  photoId: string
}

const FAKE_COMMENTS = [
  "First!",
  "Not last",
  "Very nice picture",
  "Splendid saturation!",
]

const ViewImage: React.FC = () => {
  const { photoId } = useParams<RouteParams>()
  const [comments, setComments] = useState<string[]>([])

  useEffect(() => {
    setComments(FAKE_COMMENTS)
  }, [])

  return (
    <Container className="p-5 mb-2 bg-light text-dark">
      <Row className="text-center">
        <Col>
          <h3>{photoId}.jpg</h3>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Image className="image-class-name" src={nature} />
        </Col>
      </Row>
      <Row className="p-3 mt-5">
        <Col>
          <h4>Comments (displaying last five)</h4>
          <div className="pt-3">
            {comments.map((comment, idx) => {
              return (
                <Alert key={idx} className="p-3 text-dark" variant="secondary">
                  {comment}
                </Alert>
              )
            })}
          </div>
        </Col>
        <Col>
          <h4>Add a new comment</h4>
          <Form className="pt-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Control placeholder="Enter your comment ..." />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg" block>
              Submit comment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ViewImage
