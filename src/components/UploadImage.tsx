import React, { useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { uploadImageAsBase64, uploadImageAsFile } from "../api/backend"

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File>()
  const [uploadAsBase64, setUploadAsBase64] = useState<boolean>(false)
  const [showError, setShowError] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // required to avoid a reload that aborts the request
    event.preventDefault()

    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // required to avoid a reload that aborts the request
    event.preventDefault()

    if (file) {
      try {
        if (uploadAsBase64) {
          await uploadImageAsBase64(file)
        } else {
          await uploadImageAsFile(file)
        }
        setShowError(false)
      } catch (err) {
        console.log(err)
        setShowError(true)
      }
    }
  }

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <div>
        {showError && (
          <>
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
            >
              <Alert.Heading>Oh snap! Could not upload photo!</Alert.Heading>
              <p>Have you implemented the POST /images backend function?</p>
            </Alert>
          </>
        )}
      </div>
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

export default UploadImage
