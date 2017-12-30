import * as api from '../../api'

export const readingChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READING_CHAPTER',
    payload: { mangaId, chapterId }
  }
}

export const loadChapter = (mangaId, chapterId) => {
  return dispatch => {
    api
      .chapter(mangaId, chapterId)
      .then(({ chapter }) =>
        dispatch({ type: 'MANGA_SET_CHAPTER', payload: chapter })
      )
      .catch(err => console.error(err))
  }
}

export const loadManga = mangaId => {
  return dispatch =>
    api
      .show(mangaId)
      .then(({ manga }) =>
        dispatch({ type: 'MANGA_SET_MANGA', payload: manga })
      )
}

export const loadAll = () => {
  return dispatch => {
    return api
      .all()
      .then(mangas => dispatch({ type: 'MANGA_SET_ALL', payload: mangas }))
  }
}

export const readChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READ_CHAPTER',
    payload: {
      chapterId,
      mangaId
    }
  }
}

export const restoreBackup = (
  ongoingChapterByMangaId,
  readChaptersByMangaId
) => {
  return {
    type: 'MANGA_RESTORE_BACKUP',
    payload: {
      ongoingChapterByMangaId,
      readChaptersByMangaId
    }
  }
}
