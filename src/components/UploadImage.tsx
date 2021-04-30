import bsCustomFileInput from "bs-custom-file-input"
import React, { useEffect, useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { CORSError } from "../api/http"
import {
  PostImageInternalServerError,
  PostImageNotFoundError,
  uploadImageAsBase64,
  uploadImageAsFile,
} from "../api/images"
import { environment } from "../environment"
import CORSErrorComponent from "./errors/CorsError"
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
          setError(NotFoundErrorComponent)
        } else if (err instanceof PostImageInternalServerError) {
          setError(InternalServerErrorComponent)
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

const NotFoundErrorComponent: React.FC = () => {
  return (
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
  )
}

const InternalServerErrorComponent: React.FC = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Oh snap! Internal Server Error (500)</Alert.Heading>
      <ul>
        <li>
          If your backend expects to receive the raw image bytes, make sure to{" "}
          <strong>not</strong> check the checkbox in this form
        </li>
        <li>
          If your backend expects a base64 encoded image, make sure the checkbox
          in this form is checked
        </li>
      </ul>
    </Alert>
  )
}

export default UploadImage
