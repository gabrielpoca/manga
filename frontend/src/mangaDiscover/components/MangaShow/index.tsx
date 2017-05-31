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

interface State {
  backgroundImage?: string;
  backgroundWidth?: number;
  backgroundHeight?: number;
}

class MangaShow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.updateStyles(props.manga.cover);
  }

  componentWillReceiveProps(props: Props) {
    this.updateStyles(props.manga.cover);
  }

  updateStyles(cover: string) {
    const image = document.createElement('img');
    image.onload = () => {
      this.setState({
        backgroundImage: cover,
        backgroundWidth: image.width,
        backgroundHeight: image.height,
      });
    };
    image.src = this.props.manga.cover;
  }

  backgroundStyles = () => {
    const { backgroundImage, backgroundWidth, backgroundHeight } = this.state;

    if (!backgroundImage || !backgroundWidth || !backgroundHeight) {
      return;
    }

    return {
      backgroundPosition: `${backgroundWidth / 2}px ${backgroundHeight / 2}px`,
      backgroundImage: `url('${this.props.manga.cover}')`
    };
  }

  renderButton = () => {
    const { manga, ongoingChapter } = this.props;

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
  }

  render() {
    const { manga, cachedChapters, onOffline, ongoingChapter } = this.props;
    const { id, name, cover, chapters = [] } = manga;

    return <div
      style={this.backgroundStyles()}
      className={styles.root}
    >
      <Header />
      <div className={styles.grid}>
        <Link to="/" className={styles.close}>
          <span className={styles.closeLabel}>Back</span>
        </Link>
        <Cover className={styles.image} cover={manga.cover} />
        <div className={styles.details}>
          <div className={styles.title}>
            <H1 level={Level.h1}>{name}</H1>
          </div>
          {this.renderButton()}
        </div>
        <div className={styles.chapters}>
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
  }
}

export default MangaShow;
