import baseURL from './url'

export const chapter = (mangaId, chapterId) => {
  return `${baseURL}/mangas/${mangaId}/chapters/${chapterId}`
}

export const show = mangaId => {
  return `${baseURL}/mangas/${mangaId}`
}

export const all = () => {
  return `${baseURL}/mangas`
}
