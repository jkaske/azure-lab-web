import React, { useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { CORSError } from "../api/http"
import {
  PostImageNotFoundError,
  uploadImageAsBase64,
  uploadImageAsFile,
} from "../api/images"
import { environment } from "../environment"
import CORSErrorComponent from "./errors/CorsError"

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File>()
  const [uploadAsBase64, setUploadAsBase64] = useState<boolean>(false)
  const [error, setError] = useState<React.FC>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault() // required to avoid a reload that aborts the request

    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault() // required to avoid a reload that aborts the request

    if (file) {
      try {
        if (uploadAsBase64) {
          await uploadImageAsBase64(file)
        } else {
          await uploadImageAsFile(file)
        }
      } catch (err) {
        if (err instanceof PostImageNotFoundError) {
          setError(NotFoundErrorComponent)
        }
        if (err instanceof CORSError) {
          setError(CORSErrorComponent)
        }
      }
    }
  }

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <div>{error && error}</div>
      <div className="input-group">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            multiple={false}
            onChange={handleChange}
          />
          <label className="custom-file-label" htmlFor="inputGroupFile01">
            {file ? file.name : "Choose a .jpg photo to upload"}
          </label>
        </div>
      </div>
      <div className="form-check pt-3 pb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          checked={uploadAsBase64}
          onChange={() => setUploadAsBase64(!uploadAsBase64)}
        />
        <label className="form-check-label">Upload image as base64</label>
      </div>
      <div className="input-group-prepend">
        <Button
          type="submit"
          id="inputGroupFileAddon01"
          variant="secondary"
          size="lg"
          block
          onClick={handleClick}
        >
          Submit photo
        </Button>
      </div>
    </div>
  )
}

const NotFoundErrorComponent: React.FC = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>
          Oh snap! The POST <strong>/images</strong> route was not found (HTTP
          404).
        </Alert.Heading>
        <ul>
          <li>Make sure your backend is running</li>
          <li>
            Make sure the website is configured with the correct backend,
            currently it is configured to go to{" "}
            <strong>{environment.baseUrl}</strong>
          </li>
          <li>
            Make sure your POST /images function is exposed under the correct
            route (i.e. /images, not /api/images)
          </li>
        </ul>
      </Alert>
    </>
  )
}

export default UploadImage
