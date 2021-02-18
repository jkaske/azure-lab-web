import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { uploadImage } from "../api/backend"

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (file) {
      try {
        await uploadImage(file)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="p-5 mb-2 bg-light text-dark">
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
