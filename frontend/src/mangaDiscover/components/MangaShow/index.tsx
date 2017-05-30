import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = require('./styles.css');

import { spacing, maxWidth, fontSize } from '../../../styles';

import * as manga from 'manga';
import ChapterItem from '../ChapterItem';
import Cover from '../Cover';
import Button from '../../../components/Button';
import { H1, Level } from '../../../components/Heading';
import Header from '../Header';

interface Props {
  manga: manga.interfaces.MangaFull;
  cachedChapters: Array<string>;
  onOffline?: (chapterId: string) => void;
  ongoingChapter: string;
}

const renderButton = (manga: any, ongoingChapter: string) => {
  if (!ongoingChapter) {
    return <Link to={`/manga/${manga.id}/chapter/1`}>
      <Button>
        Start Reading
      </Button>
    </Link>;
  } else {
    return <Link to={`/manga/${manga.id}/chapter/${ongoingChapter}`}>
      <Button>
        Chapter {ongoingChapter}
      </Button>
    </Link>;
  }
};

const MangaShow = ({ manga, cachedChapters, onOffline, ongoingChapter }: Props) => {
  const { id, name, cover, chapters = [] } = manga;

  return <div>
    <Header />
    <div className={styles.grid}>
      <div className={styles.title}>
        <H1 level={Level.h1}>{name}</H1>
      </div>
      <Cover className={styles.gridImage} cover={manga.cover} />
      <div className={styles.gridButton}>
        {renderButton(manga, ongoingChapter)}
      </div>
      <div className={styles.gridChapters}>
        {chapters.map(chapter => (
          <ChapterItem
            cached={cachedChapters.indexOf(chapter.id + '') !== -1}
            key={chapter.id}
            id={id}
            chapter={chapter}
            onOffline={onOffline}
          />
        ))}
      </div>
    </div>
  </div>;
};

export default MangaShow;
