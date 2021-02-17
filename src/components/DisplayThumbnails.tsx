import React, { useEffect, useState } from "react"
import { Col, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Thumbnail, getThumbnails } from "../api/backend"

const DisplayThumbnails: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const t = await getThumbnails()
        setThumbnails(t)
      } catch (err) {
        console.error(err)
      }
    }
    fetchThumbnails()
  }, [])

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <h2>My photos</h2>
      <p className="fw-lighter">Click on a photo to view comments</p>
      <Row>
        <Col className="text-center">
          {thumbnails.map((thumbnail, idx) => {
            return (
              <Link to={`/photo/${thumbnail.id}`} key={idx}>
                <Image src={thumbnail.thumbnail} width="200" thumbnail />
              </Link>
            )
          })}
        </Col>
      </Row>
    </div>
  )
}

export default DisplayThumbnails

// https://azure101apipython.blob.core.windows.net/thumbnails/c5e7593a-ae46-456d-a098-798b30bcdf73.jpg
// https://azure101apipython.blob.core.windows.net/thumbnails/c5e7593a-ae46-456d-a098-798b30bcdf73.jpg
