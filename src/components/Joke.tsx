import React, { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"
import {
  getJoke,
  Joke,
  JokeContentTypeError,
  JokeNotFoundError,
  JokeResponseBodyError,
} from "../api/joke"

const NotFoundErrorComponent: React.FC = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>
          Oh snap! The <strong>/joke</strong> route was not found (HTTP 404).
        </Alert.Heading>
        <ul>
          <li>Make sure your backend is running</li>
          <li>Make sure your joke function is exposed under the /joke route</li>
        </ul>
      </Alert>
    </>
  )
}

const ResponseBodyErrorComponent: React.FC = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>
          Oh snap! The response body returned from <strong>/joke</strong> is not
          right.
        </Alert.Heading>
        <p>
          Make sure your joke function returns a response body similar to the
          following:
        </p>
        <pre>{JSON.stringify({ text: "This is my joke!" }, null, 2)}</pre>
      </Alert>
    </>
  )
}

const ContentTypeErrorComponent: React.FC = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>
          Oh snap! The response content type header is not right.
        </Alert.Heading>
        <p>
          Make sure your joke function sets the response{" "}
          <strong>Content-Type</strong> header to{" "}
          <strong>application/json</strong>.
        </p>
      </Alert>
    </>
  )
}

const ThisComponentIsAJoke: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>()
  const [error, setError] = useState<React.FC | null>()

  useEffect(() => {
    const getNewJoke = async () => {
      try {
        const j = await getJoke()
        setJoke(j)
      } catch (err) {
        if (err instanceof JokeNotFoundError) {
          setError(NotFoundErrorComponent)
        }
        if (err instanceof JokeResponseBodyError) {
          setError(ResponseBodyErrorComponent)
        }
        if (err instanceof JokeContentTypeError) {
          setError(ContentTypeErrorComponent)
        }
      }
    }

    getNewJoke()
  }, [])

  return (
    <>
      {error && error}
      <blockquote className="blockquote text-center pb-5">
        <p>{joke ? joke.text : ""}</p>
      </blockquote>
    </>
  )
}

export default ThisComponentIsAJoke
