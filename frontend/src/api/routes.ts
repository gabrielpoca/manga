import baseURL from './url';

export const chapter = (mangaId: string, chapterId: string) => {
  return `${baseURL}/mangas/${mangaId}/chapters/${chapterId}`;
};

export const show = (mangaId: string) => {
  return `${baseURL}/mangas/${mangaId}`;
};

export const all = () => {
  return `${baseURL}/mangas`;
};
