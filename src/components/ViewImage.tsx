import React, { useEffect, useState } from "react"
import { Alert, Col, Container, Image, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { getImageById, Photo } from "../api/backend"

interface RouteParams {
  photoId: string
}

const EmptyPhoto: Photo = {
  uri: "",
}

const ViewImage: React.FC = () => {
  const { photoId } = useParams<RouteParams>()
  const [photo, setPhoto] = useState<Photo>(EmptyPhoto)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const p = await getImageById(photoId)
        setPhoto(p)
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
          <h3>{photoId}</h3>
          {showError && (
            <>
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
              >
                <Alert.Heading>Oh snap! Could not fetch photo!</Alert.Heading>
                <p>
                  Have you implemented the GET /photo/id function? Maybe the
                  photo does not exist in your storage?
                </p>
              </Alert>
            </>
          )}
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Image className="image-class-name w-100" src={photo.uri} />
        </Col>
      </Row>
    </Container>
  )
}

export default ViewImage
