import { filter } from 'lodash';
import { Reducer, Action } from '../interfaces';

const initialState = {
  allManga: [],
  chapterById: {},
  mangaById: {},
};

export default (state: Reducer = initialState, action: Action): Reducer => {
  switch (action.type) {
    case 'MANGA_DISCOVER_SET_MANGA':
      const manga = action.payload;
      const newManga = { ...state.mangaById[manga.id], ...manga };

      return {
        ...state,
        mangaById: { ...state.mangaById, [manga.id]:  newManga },
      };
    case 'MANGA_DISCOVER_SET_ALL':
      return { ...state, allManga: action.payload };
    case 'MANGA_DISCOVER_SET_CHAPTER':
      const chapter = action.payload;
      const newChapter = { ...state.chapterById[chapter.id], ...chapter };

      return {
        ...state,
        chapterById: {
          ...state.chapterById,
          [chapter.id]: newChapter
        }
      };
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

export const getCachedChapters = (state: { manga: Reducer }, mangaId: string) => {
  return filter(state.manga.chapterById, { cached: true, mangaId });
};

export const getChapter = (state: { manga: Reducer }, mangaId: string, chapterId: string) => {
  return state.manga.chapterById[chapterId];
};
