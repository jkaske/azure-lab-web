import { environment } from "../environment"

export interface Thumbnail {
  id: string
  uri: string
}

export interface Photo {
  uri: string
  comments: Comment[]
}

export interface Comment {
  datetime: string
  text: string
}

export interface Joke {
  text: string
}

export const getJoke = async (): Promise<Joke> => {
  const res = await getRequest(`${environment.baseUrl}/joke`)

  if (res.status !== 200) {
    throw new Error("Could not get joke (no pun intended)")
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

export const getImageById = async (imageId: string): Promise<Photo> => {
  const res = await getRequest(`${environment.baseUrl}/images/${imageId}`)

  if (res.status !== 200) {
    throw new Error("Could not fetch image details")
  }

  const body = await res.json()

  return body
}

export const uploadImageAsFile = async (file: File): Promise<void> => {
  const res = await postImageRequest(`${environment.baseUrl}/images`, file)

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
    reader.onload = () =>
      resolve(reader.result ? reader.result.toString() : "fail")
    reader.onerror = (error) => reject(error)
  })
}

export const addCommentOnImage = async (
  imageId: string,
  comment: string
): Promise<void> => {
  const body = {
    text: comment,
  }

  const res = await postRequest(
    `${environment.baseUrl}/images/${imageId}/comments`,
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

const postImageRequest = (url: string, body: File): Promise<Response> => {
  return send(url, {
    method: "POST",
    headers: { "content-type": "application/octet-stream" },
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
