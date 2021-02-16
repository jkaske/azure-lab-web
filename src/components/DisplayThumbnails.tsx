import React from "react"
import { Col, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import nature from "../assets/nature.jpg"

const DisplayThumbnails: React.FC = () => {
  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <h2>My photos</h2>
      <p className="fw-lighter">Click on a photo to view comments</p>
      <Row>
        <Col className="text-center">
          {[...Array(33)].map((num, idx) => {
            return (
              <Link to={`/photo/${idx}`} key={idx}>
                <Image src={nature} width="171" thumbnail />
              </Link>
            )
          })}
        </Col>
      </Row>
    </div>
  )
}

export default DisplayThumbnails
