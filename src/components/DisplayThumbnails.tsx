import React, { useEffect, useState } from "react"
import { Alert, Col, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Thumbnail, getThumbnails } from "../api/backend"

const DisplayThumbnails: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const t = await getThumbnails()
        setThumbnails(t)
      } catch (err) {
        console.error(err)
        setShowError(true)
      }
    }

    const interval = setInterval(() => {
      fetchThumbnails()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <h2>My photos</h2>
      <p className="fw-lighter">
        Click on a photo to view larger size and read comments. Reload page to
        update list.
      </p>
      <Row>
        <Col className="text-center">
          {showError && (
            <>
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
              >
                <Alert.Heading>
                  Oh snap! Could not fetch thumbnails!
                </Alert.Heading>
                <p>Have you implemented the thumbnail backend function?</p>
              </Alert>
            </>
          )}
          {thumbnails.map((thumbnail, idx) => {
            return (
              <Link to={`/photo/${thumbnail.id}`} key={idx}>
                <Image src={thumbnail.uri} width="200" thumbnail />
              </Link>
            )
          })}
        </Col>
      </Row>
    </div>
  )
}

export default DisplayThumbnails
