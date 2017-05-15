import * as api from '../../api';
import {
  SetMangaAction,
  SetMangasAction,
  SetChapterAction,
  ChapterFull,
} from '../interfaces';

declare type SetMangaDispatch = (action: SetMangaAction) => any;
declare type SetMangasDispatch = (action: SetMangasAction) => any;
declare type SetChapterDispatch = (action: SetChapterAction | SetMangaAction) => any;

export const loadChapter = (mangaId: string, chapterId: string) => {
  return (dispatch: SetChapterDispatch) => {
    api.chapter(mangaId, chapterId)
      .then(({ chapter }) => dispatch({ type: 'MANGA_DISCOVER_SET_CHAPTER', payload: chapter }));
  };
};

export const loadManga = (mangaId: string)  => {
  return (dispatch: SetMangaDispatch) => {
    api.show(mangaId)
      .then(({ manga }) => dispatch({ type: 'MANGA_DISCOVER_SET_MANGA', payload: manga }));
  };
};

export const loadAll = () => {
  return (dispatch: SetMangasDispatch) => {
    return api.all()
      .then(mangas => dispatch({ type: 'MANGA_DISCOVER_SET_ALL', payload: mangas }));
  };
};

const cacheChapterAsync = async (mangaId: string, chapterId: string) => {
  const imageCache = await caches.open('cache-image');
  const chapterCache = await caches.open('cache-chapter');
  const cacheManga = await caches.open('cache-manga');

  const { chapter, response, requestURL } = await api.chapter(mangaId, chapterId + '');
  const { manga, response: mangaResponse, requestURL: mangaRequestURL } = await api.show(mangaId);

  (chapter as ChapterFull).pages.map(async page => {
    const pageResponse = await fetch(page.url, { mode: 'no-cors' });
    return imageCache.put(page.url, pageResponse);
  });

  await chapterCache.put(requestURL, response);
  await cacheManga.put(mangaRequestURL, mangaResponse);

  return { chapter, manga };
};

export const cacheChapter = (mangaId: string, chapterId: string) => {
  return (dispatch: SetChapterDispatch) => {
    cacheChapterAsync(mangaId, chapterId)
      .then(({ chapter, manga }) => {
        dispatch({
          type: 'MANGA_DISCOVER_SET_MANGA',
          payload: { ...manga, cached: true },
        });

        return dispatch({
          type: 'MANGA_DISCOVER_SET_CHAPTER',
          payload: { ...chapter, cached: true },
        });
      });
  };
};
