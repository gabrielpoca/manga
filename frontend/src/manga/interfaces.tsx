export interface MangaPreview {
  id: string;
  name: string;
  cover: string;
  cached?: boolean;
}

export interface Page {
  pageId: number;
  url: string;
}

export interface Chapter {
  id: number;
  name: string;
}

export interface ChapterFull {
  id: string;
  mangaId: string;
  name: string;
  href: string;
  pages: Array<Page>;
  cached?: boolean;
}

export interface MangaFull {
  artist: Array<string>;
  author: Array<string>;
  chapters: Array<Chapter>;
  cover: string;
  genres: Array<string>;
  id: string;
  info: string;
  lastUpdate: string;
  name: string;
  originalId?: string;
  status: string;
  yearOfRelease: number;
}

export interface Reducer {
  chapterById: {
    [id: string]: ChapterFull
  };
  mangaById: {
    [id: string]: MangaFull
  };
  allManga: Array<MangaPreview>;
}

export interface SetChapterAction {
  type: 'MANGA_SET_CHAPTER';
  payload: ChapterFull;
}

export interface SetMangaAction {
  type: 'MANGA_SET_MANGA';
  payload: MangaFull;
}

export interface SetMangasAction {
  type: 'MANGA_SET_ALL';
  payload: Array<MangaPreview>;
}

export type Action = SetMangaAction | SetMangasAction | SetChapterAction;
