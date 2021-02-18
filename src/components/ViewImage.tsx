import React, { useEffect, useState } from "react"
import {
  Alert,
  Col,
  Container,
  Image,
  Row,
  Form,
  Button,
  Badge,
} from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Photo, getImageById, addCommentOnImage, Comment } from "../api/backend"

interface RouteParams {
  photoId: string
}

const EmptyPhoto: Photo = {
  uri: "",
  comments: [],
}

const ViewImage: React.FC = () => {
  const { photoId } = useParams<RouteParams>()
  const [photo, setPhoto] = useState<Photo>(EmptyPhoto)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])

  const onAddComment = async (e: React.FormEvent) => {
    // required to avoid a reload that aborts the request
    e.preventDefault()

    try {
      await addCommentOnImage(photoId, newComment)
      setComments([
        ...comments,
        { text: newComment, datetime: new Date().toISOString() },
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setNewComment("")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value)
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const p = await getImageById(photoId)
        setPhoto(p)
        setComments(p.comments)
      } catch (err) {
        console.error(err)
      }
    }
    fetchImage()
  }, [photoId])

  return (
    <Container className="p-5 mb-2 bg-light text-dark">
      <Row className="text-center">
        <Col>
          <h3>{photoId}.jpg</h3>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Image className="image-class-name w-100" src={photo.uri} />
        </Col>
      </Row>
      <Row className="p-3 mt-5">
        <Col>
          <h4>Comments (displaying last five)</h4>
          <div className="pt-3">
            {comments.map((comment, idx) => {
              return (
                <Alert key={idx} className="p-3 text-dark" variant="secondary">
                  <Badge variant="secondary" className="mr-2 p-2">
                    {comment.datetime}
                  </Badge>
                  {comment.text}
                </Alert>
              )
            })}
          </div>
        </Col>
        <Col>
          <h4>Add a new comment</h4>
          <Form className="pt-3" onSubmit={onAddComment}>
            <Form.Group>
              <Form.Control
                placeholder="Enter your comment ..."
                type="text"
                onChange={handleChange}
              />
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
