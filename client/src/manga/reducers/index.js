import { get, reduce, uniq, map, find, compact, isEmpty } from 'lodash'

const initialState = {
  allManga: [],
  allMangaById: {},
  chapterByMangaId: {},
  mangaById: {},
  ongoingChapterByMangaId: {},
  readChaptersByMangaId: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MANGA_SET_MANGA': {
      const manga = action.payload
      const newManga = { ...state.mangaById[manga.id], ...manga }

      return {
        ...state,
        mangaById: { ...state.mangaById, [manga.id]: newManga }
      }
    }
    case 'MANGA_SET_ALL': {
      const allMangaById = reduce(
        action.payload,
        (memo, manga, index) => {
          memo[manga['id']] = index
          return memo
        },
        {}
      )
      return { ...state, allMangaById, allManga: action.payload }
    }
    case 'MANGA_SET_CHAPTER': {
      const chapter = action.payload
      const newChapter = { ...state.chapterByMangaId[chapter.id], ...chapter }

      return {
        ...state,
        chapterByMangaId: {
          ...state.chapterByMangaId,
          [chapter.mangaId]: {
            ...state.chapterByMangaId[chapter.mangaId],
            [chapter.id]: newChapter
          }
        }
      }
    }
    case 'MANGA_READING_CHAPTER': {
      const { mangaId, chapterId } = action.payload
      return {
        ...state,
        ongoingChapterByMangaId: {
          ...state.ongoingChapterByMangaId,
          [mangaId]: chapterId
        }
      }
    }
    case 'MANGA_READ_CHAPTER': {
      const { mangaId, chapterId } = action.payload
      const chapters = get(state.readChaptersByMangaId, mangaId, [])

      return {
        ...state,
        readChaptersByMangaId: {
          ...state.readChaptersByMangaId,
          [mangaId]: uniq([chapterId, ...chapters])
        }
      }
    }
    case 'MANGA_RESTORE_BACKUP': {
      const { ongoingChapterByMangaId, readChaptersByMangaId } = action.payload

      return {
        ...state,
        ongoingChapterByMangaId,
        readChaptersByMangaId
      }
    }
    default:
      return state
  }
}

export const getManga = (state, mangaId) => {
  const manga = state.manga.mangaById[mangaId]
  return manga || state.manga.allManga[state.manga.allMangaById[mangaId]]
}

export const getMangas = state => state.manga.allManga

export const getOngoingMangas = state => {
  if (isEmpty(state.manga.allManga)) {
    return []
  }

  const mangas = map(state.manga.ongoingChapterByMangaId, (chapter, id) => {
    let foundManga = state.manga.mangaById[id]

    if (!foundManga) {
      foundManga = find(state.manga.allManga, { id: id })
    }

    return {
      ...foundManga,
      ongoingChapter: chapter
    }
  })

  return compact(mangas)
}

export const getOngoingChapter = (state, mangaId) =>
  state.manga.ongoingChapterByMangaId[mangaId]

export const getChapter = (state, mangaId, chapterId) =>
  get(state.manga.chapterByMangaId, `${mangaId}.${chapterId + ''}`)

export const getReadChaptersForManga = (state, mangaId) =>
  get(state.manga.readChaptersByMangaId, mangaId) || []

export const getReadChapters = state => state.manga.readChaptersByMangaId
