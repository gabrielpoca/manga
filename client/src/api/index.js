import * as routes from './routes'

const request = url => {
  return fetch(url)
}

export { routes }

export const chapter = async (mangaId, chapterId) => {
  try {
    const requestURL = routes.chapter(mangaId, chapterId)
    const response = await request(requestURL)
    const responseClone = response.clone()

    const mangaChapter = await response.json()

    mangaChapter.id = chapterId
    mangaChapter.mangaId = mangaId

    return {
      chapter: mangaChapter,
      response: responseClone,
      requestURL
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

export const show = async mangaId => {
  try {
    const requestURL = routes.show(mangaId)
    const response = await request(requestURL)
    const responseClone = response.clone()
    const manga = await response.json()

    manga.originalId = manga.id
    manga.id = mangaId

    return {
      requestURL,
      response: responseClone,
      manga
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

export const all = async () => {
  const response = await request(routes.all())
  const mangas = await response.json()
  return mangas
}
