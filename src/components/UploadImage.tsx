import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { addNewImage } from "../api/backend"

const UploadImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>()

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const fileList = event.target.files
    if (!fileList) return
    // setSelectedFile(fileList[0])

    const formData = new FormData()
    formData.append("0", fileList[0])

    await addNewImage(formData)
  }

  const onSubmitForm = async (e: React.FormEvent) => {
    // required to avoid a reload that aborts the request
    e.preventDefault()

    if (selectedFile) {
      const formData = new FormData()

      formData.append("name", selectedFile.name)
      formData.append("file", selectedFile)

      try {
        await addNewImage(formData)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <Form onSubmit={onSubmitForm}>
        <h2>Upload a new photo</h2>
        <Form.Group>
          <input
            accept="image/jpeg"
            className="form-control form-control-lg"
            id="photo"
            name="photo"
            multiple={false}
            type="file"
            onChange={onFileChange}
          />
        </Form.Group>
        <Button type="submit" variant="secondary" size="lg" block>
          Submit photo
        </Button>
      </Form>
    </div>
  )
}

export default UploadImage
