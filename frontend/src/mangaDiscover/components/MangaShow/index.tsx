import * as React from 'react';
import styled from 'styled-components';

const styles = require('./styles.css');
import { spacing, maxWidth, fontSize } from '../../../styles';

import * as manga from 'manga';
import ChapterItem from '../ChapterItem';
import Cover from '../Cover';
import Button from '../../../components/Button';
import Header from '../Header';

interface Props {
  manga: manga.interfaces.MangaFull;
  cachedChapters: Array<string>;
  onOffline?: (chapterId: string) => void;
}

const MangaShow = ({ manga, cachedChapters, onOffline }: Props) => {
  const { id, name, cover, chapters = [] } = manga;

  return <div>
    <Header />
    <div className={styles.grid}>
      <h1 className={styles.title}>{name}</h1>
      <Cover className={styles.gridImage} cover={manga.cover} />
      <div className={styles.gridButton}>
        <Button>Continue</Button>
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
