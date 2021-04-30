import bsCustomFileInput from "bs-custom-file-input"
import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { CORSError } from "../api/http"
import {
  PostImageInternalServerError,
  PostImageNotFoundError,
  uploadImageAsBase64,
  uploadImageAsFile,
} from "../api/images"
import CORSErrorComponent from "./errors/CorsError"
import PostImagesInternalServerErrorComponent from "./errors/PostImagesInternalServerError"
import PostImagesNotFoundErrorComponent from "./errors/PostImagesNotFoundError"
import UnknownErrorComponent from "./errors/UnknownError"

type FormValues = {
  fileList: FileList
  asBase64: boolean
}

const UploadImage: React.FC = () => {
  const [error, setError] = useState<React.FC>()

  const { register, handleSubmit } = useForm<FormValues>()

  useEffect(() => {
    bsCustomFileInput.init()
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const file = data.fileList.item(0)

    if (file) {
      try {
        if (data.asBase64) {
          await uploadImageAsBase64(file)
        } else {
          await uploadImageAsFile(file)
        }
      } catch (err) {
        if (err instanceof PostImageNotFoundError) {
          setError(PostImagesNotFoundErrorComponent)
        } else if (err instanceof PostImageInternalServerError) {
          setError(PostImagesInternalServerErrorComponent)
        } else if (err instanceof CORSError) {
          setError(CORSErrorComponent)
        } else {
          setError(UnknownErrorComponent)
        }
      }
    }
  }

  return (
    <div className="p-5 mb-2 bg-light text-dark">
      {error}
      <Form>
        <Form.File id="myfile" custom>
          <Form.File.Input {...register("fileList")} />
          <Form.File.Label>
            Select a JPG photo from your local computer
          </Form.File.Label>
        </Form.File>
        <Form.Check
          label="Encode photo as base64 before upload"
          {...register("asBase64")}
        />
        <Button
          type="submit"
          id="inputGroupFileAddon01"
          variant="primary"
          size="lg"
          block
          onClick={handleSubmit(onSubmit)}
        >
          Submit photo
        </Button>
      </Form>
    </div>
  )
}

export default UploadImage
