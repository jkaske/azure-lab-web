import { environment } from "../environment"
import { getRequest, postImageRequest, postRequest } from "./http"

export interface Thumbnail {
  id: string
  uri: string
}

export interface Image {
  id: string
  uri: string
  thumbnail?: string
}

export class ImagesRouteNotFoundError extends Error {}

export const getImages = async (): Promise<Image[]> => {
  const res = await getRequest(`${environment.baseUrl}/images`)

  if (res.status === 404) {
    throw new ImagesRouteNotFoundError()
  }

  const body = await res.json()
  return body
}

export const getThumbnails = async (): Promise<Thumbnail[]> => {
  const res = await getRequest(`${environment.baseUrl}/thumbnails`)

  if (res.status !== 200) {
    throw new Error("Could not get thumbnails")
  }

  const body = await res.json()
  return body
}

export class GetImageIdNotFoundError extends Error {}
export class GetImageIdResponseBodyError extends Error {}
export class GetImageIdContentTypeError extends Error {}

export const getImageById = async (imageId: string): Promise<Image> => {
  const res = await getRequest(`${environment.baseUrl}/images/${imageId}`)

  if (res.status === 404) {
    throw new GetImageIdNotFoundError()
  }

  const contentType = res.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    throw new GetImageIdContentTypeError()
  }

  const body = await res.json()

  if (!body.id || !body.uri) {
    throw new GetImageIdResponseBodyError()
  }

  return body
}

export class PostImageNotFoundError extends Error {}

export const uploadImageAsFile = async (file: File): Promise<void> => {
  const res = await postImageRequest(`${environment.baseUrl}/images`, file)

  if (res.status === 404) {
    throw new PostImageNotFoundError()
  }

  if (res.status !== 201) {
    throw new Error("Could not upload image")
  }
}

export const uploadImageAsBase64 = async (file: File): Promise<void> => {
  const b64 = await file2Base64(file)

  const body = {
    data: b64,
  }

  const res = await postRequest(`${environment.baseUrl}/images`, body)

  if (res.status !== 201) {
    throw new Error("Could not upload image")
  }
}

const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
        ? reader.result.toString().replace("data:", "").replace(/^.+,/, "")
        : "fail"

      resolve(result)
    }

    reader.onerror = (error) => reject(error)
  })
}
