export interface Page {
  pageId: number;
  url: string;
}

export interface Chapter {
  id: string;
  mangaId: string;
  name: string;
  href: string;
  pages: Array<Page>;
}
