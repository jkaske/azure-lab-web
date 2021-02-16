interface Thumbnail {
  uri: string
}

interface Photo {
  uri: string
}

export const getThumbnails = async (): Promise<Thumbnail[]> => {
  return []
}

export const getPhotoById = async (id: string): Promise<Photo> => {
  return { uri: "dummy" }
}

export const addPhoto = async (): Promise<void> => {}

export const addCommentOnPhoto = async (
  id: string,
  comment: string
): Promise<void> => {}
