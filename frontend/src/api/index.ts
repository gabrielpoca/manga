import * as routes from './routes';

const request = (url: string) => {
  return fetch(url);
};

export const chapter = async (mangaId: string, chapterId: string) => {
  const requestURL = routes.chapter(mangaId, chapterId);
  const response = await request(requestURL);
  const responseClone = response.clone();

  const mangaChapter = await response.json();
  mangaChapter.id = chapterId;
  mangaChapter.mangaId = mangaId;

  if (Object.keys(mangaChapter).length === 0) {
    return {
      chapter: { id: null, pages: [], name: '', href: '' },
      response: responseClone,
      requestURL,
    };
  } else {
    return {
      chapter: mangaChapter,
      response: responseClone,
      requestURL
    };
  }
};

export const show = async (mangaId: string) => {
  const requestURL = routes.show(mangaId);
  const response = await request(requestURL);
  const responseClone = response.clone();
  const manga = await response.json();

  manga.originalId = manga.id;
  manga.id = mangaId;

  return {
    requestURL,
    response: responseClone,
    manga,
  };
};

export const all = async () => {
  const response = await request(routes.all());
  const mangas = await response.json();
  return mangas;
};
