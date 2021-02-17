import { environment } from "../environment"

export interface Thumbnail {
  id: string
  thumbnail: string
}

export interface Photo {
  uri: string
  comments: Comment[]
}

export interface Comment {
  datetime: string
  text: string
}

export const getThumbnails = async (): Promise<Thumbnail[]> => {
  const res = await getRequest(`${environment.api.baseUrl}/thumbnails`)

  if (res.status !== 200) {
    throw new Error("Could not get thumbnails")
  }

  const body = await res.json()
  return body
}

export const getImageById = async (imageId: string): Promise<Photo> => {
  const res = await getRequest(`${environment.api.baseUrl}/images/${imageId}`)

  if (res.status !== 200) {
    throw new Error("Could not fetch image details")
  }

  const body = await res.json()

  return body
}

export const addNewImage = async (formData: FormData): Promise<void> => {
  const res = await postImageRequest(
    `${environment.api.baseUrl}/images`,
    formData
  )
}

export const addCommentOnImage = async (
  imageId: string,
  comment: string
): Promise<void> => {
  const body = {
    text: comment,
  }

  const res = await postRequest(
    `${environment.api.baseUrl}/images/${imageId}/comments`,
    body
  )

  if (res.status !== 201) {
    throw new Error("Could not fetch image details")
  }
}

const postRequest = (url: string, body: unknown): Promise<Response> => {
  return send(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

const postImageRequest = (url: string, body: FormData): Promise<Response> => {
  return send(url, {
    method: "POST",
    headers: { "content-type": "image/jpeg" },
    body,
  })
}

const getRequest = (url: string): Promise<Response> => {
  return send(url, { method: "GET" })
}

const send = async (url: string, init: RequestInit): Promise<Response> => {
  const setHeaders = () => {
    init.headers = {
      ...init.headers,
      "access-control-allow-origin": "*",
    }
  }

  setHeaders()

  return await fetch(url, init)
}
