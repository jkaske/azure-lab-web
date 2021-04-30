import React from "react"
import { Alert } from "react-bootstrap"

const UnknownErrorComponent: React.FC = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>Oh snap! An unknown error has occurred!</Alert.Heading>
        <p>
          This means you have discovered an error that the course instructors
          have not thought could happen. Extra points to you! Now please report
          this error to the course instructors.
        </p>
      </Alert>
    </>
  )
}

export default UnknownErrorComponent
