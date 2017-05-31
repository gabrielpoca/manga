import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as manga from '../../../manga';
import Cover from '../Cover';
import Header from '../Header';
import Search from '../Search';
import PageContent from '../../../components/PageContent';
import { spacing, fontSize } from '../../../styles';

const styles = require('./styles.css');

export interface MangaProps {
  mangas: Array<manga.interfaces.MangaPreview>;
  ongoingMangas: {
    [id: string]: string
  };
  search: string | undefined;
  onSearch(query: string): any;
}

const GridImage = styled(Cover)`
  flex-basis: var(--gridItemSize);
  height: var(--gridItemSize);
  margin-bottom: ${spacing.small};
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default class MangaList extends React.Component<MangaProps, null> {
  renderOngoing(manga: manga.interfaces.MangaPreview) {
    if (!this.props.ongoingMangas[manga.id]) {
      return;
    }

    return <span>
      Reading on chapter {this.props.ongoingMangas[manga.id]}
    </span>;
  }

  render() {
    return <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <PageContent>
        <div className={styles.search}>
        <Search
          onChange={this.props.onSearch}
          value={this.props.search}
        />
        </div>
        <div className={styles.list}>
          {this.props.mangas.map(manga => (
            <Link
              className={styles.item}
              to={`/manga/${manga.id}`}
              key={manga.id}
            >
              <GridImage cover={manga.cover} />
              <h2 className={styles.mangaTitle}>{manga.name}</h2>
              {this.renderOngoing(manga)}
            </Link>
          ))}
        </div>
      </PageContent>
    </div>;
  }
 }
