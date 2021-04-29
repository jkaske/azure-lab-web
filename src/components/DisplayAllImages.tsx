import React, { useEffect, useState } from "react"
import { Alert, Col, Figure, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CORSError } from "../api/http"
import { getImages, Image, ImagesRouteNotFoundError } from "../api/images"
import { environment } from "../environment"
import CORSErrorComponent from "./errors/CorsError"

const DisplayAllImages: React.FC = () => {
  const [images, setImages] = useState<Image[]>([])
  const [error, setError] = useState<React.FC>()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getImages()
        setImages(images)
      } catch (err) {
        if (err instanceof ImagesRouteNotFoundError) {
          setError(ImagesRouteNotFoundComponent)
        }
        if (err instanceof CORSError) {
          setError(CORSErrorComponent)
        }
        console.error(err)
      }
    }

    fetchImages() // to make sure it renders immediately

    const interval = setInterval(() => {
      fetchImages()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <h2>My Photos</h2>
      <p className="fw-lighter">
        Click on a photo to view it in larger size. This list is refreshed every
        5 seconds.
      </p>
      <Row>
        {error ? (
          <Col>{error}</Col>
        ) : (
          <>
            <Col className="text-center">
              {images.map((image, idx) => {
                return (
                  <Link to={`/photo/${image.id}`} key={idx}>
                    {image.thumbnail ? (
                      <ThumbnailComponent uri={image.thumbnail} />
                    ) : (
                      <FullsizeImageComponent uri={image.uri} />
                    )}
                  </Link>
                )
              })}
            </Col>
          </>
        )}
      </Row>
    </div>
  )
}

const ImagesRouteNotFoundComponent: React.FC = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>
          Oh snap! The GET <strong>/images</strong> route was not found (HTTP
          404).
        </Alert.Heading>
        <ul>
          <li>Make sure your backend is running</li>
          <li>Make sure that you have implemented the GET /images function!</li>
          <li>
            Make sure the website is configured with the correct backend,
            currently it is configured to go to{" "}
            <strong>{environment.baseUrl}</strong>
          </li>
          <li>
            Make sure your GET /images function is exposed under the correct
            route (i.e. /images, not /api/images)
          </li>
        </ul>
      </Alert>
    </>
  )
}

const ThumbnailComponent: React.FC<{ uri: string }> = (props: {
  uri: string
}) => {
  return (
    <Figure>
      <Figure.Image
        className="p-1 m-1 bg-success"
        src={props.uri}
        width="200"
        fluid
      />
      <Figure.Caption>Thumbnail image!</Figure.Caption>
    </Figure>
  )
}

const FullsizeImageComponent: React.FC<{ uri: string }> = (props: {
  uri: string
}) => {
  return (
    <Figure>
      <Figure.Image
        className="p-1 m-1 bg-danger"
        src={props.uri}
        width="200"
        fluid
      />
      <Figure.Caption>Full-sized image!</Figure.Caption>
    </Figure>
  )
}

export default DisplayAllImages
