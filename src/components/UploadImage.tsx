import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"

const UploadImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (!fileList) return
    setSelectedFile(fileList[0])
  }

  const onSubmitForm = () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append("image", selectedFile, selectedFile.name)
      // axios.post("url", formData)
    }
  }

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      <Form>
        <h2>Upload a new photo</h2>
        <Form.Group>
          <input
            accept="image/*"
            className="form-control form-control-lg"
            id="photo"
            name="photo"
            multiple={false}
            type="file"
            onChange={onFileChange}
          />
        </Form.Group>
        <Button onClick={onSubmitForm} variant="secondary" size="lg" block>
          Submit photo
        </Button>
      </Form>
    </div>
  )
}

export default UploadImage
