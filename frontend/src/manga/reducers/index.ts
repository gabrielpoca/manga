import { filter, get } from 'lodash';
import { Reducer, Action } from '../interfaces';

const initialState = {
  allManga: [],
  chapterByMangaId: {},
  mangaById: {},
  ongoingChapterByMangaId: {},
  finishedChapterByMangaId: {},
};

export default (state: Reducer = initialState, action: Action): Reducer => {
  switch (action.type) {
    case 'MANGA_SET_MANGA': {
      const manga = action.payload;
      const newManga = { ...state.mangaById[manga.id], ...manga };

      return {
        ...state,
        mangaById: { ...state.mangaById, [manga.id]:  newManga },
      };
    }
    case 'MANGA_SET_ALL': {
      return { ...state, allManga: action.payload };
    }
    case 'MANGA_SET_CHAPTER': {
      const chapter = action.payload;
      const newChapter = { ...state.chapterByMangaId[chapter.id], ...chapter };

      return {
        ...state,
        chapterByMangaId: {
          ...state.chapterByMangaId,
          [chapter.mangaId]: {
            ...state.chapterByMangaId[chapter.mangaId],
            [chapter.id]: newChapter
          }
        }
      };
    }
    case 'MANGA_READING_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      return {
        ...state,
        ongoingChapterByMangaId: {
          ...state.ongoingChapterByMangaId,
          [mangaId]: chapterId,
        }
      };
    }
    case 'MANGA_FINISHED_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      return {
        ...state,
        finishedChapterByMangaId: {
          ...state.finishedChapterByMangaId,
          [mangaId]: [
            chapterId,
            ...state.finishedChapterByMangaId[mangaId],
          ]
        }
      };
    }
    default:
      return state;
  }
};

export const getManga = (state: { manga: Reducer }, mangaId: string) => {
  return state.manga.mangaById[mangaId];
};

export const getMangas = (state: { manga: Reducer }) => {
  return state.manga.allManga;
};

export const getOngoingMangas = (state: { manga: Reducer })  => {
  return state.manga.ongoingChapterByMangaId;
};

export const getOngoingChapter = (state: { manga: Reducer }, mangaId: string) => {
  return state.manga.ongoingChapterByMangaId[mangaId];
};

export const getCachedChapters = (state: { manga: Reducer }, mangaId: string) => {
  return filter(state.manga.chapterByMangaId[mangaId], { cached: true });
};

export const getChapter = (state: { manga: Reducer }, mangaId: string, chapterId: string) => {
  return get(state.manga.chapterByMangaId, `${mangaId}.${chapterId}`);
};
