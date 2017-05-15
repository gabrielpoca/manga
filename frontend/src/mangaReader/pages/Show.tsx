import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import * as api from '../../api';
import ChapterReader from '../components/ChapterReader';
import { Chapter } from '../interfaces';
import * as manga from '../../manga';

interface ParamsProps {
  mangaId: string;
  chapterId: string;
}

interface ShowProps {
  manga: manga.interfaces.MangaFull;
  chapter: manga.interfaces.ChapterFull;
  loadChapter: typeof manga.actions.loadChapter;
}

class Show extends React.Component<ShowProps & RouteComponentProps<ParamsProps>, {}> {
  async componentWillMount() {
    const { mangaId, chapterId } = this.props.match.params;
    this.props.loadChapter(mangaId, chapterId);
  }

  render() {
    if (!this.props.chapter || !this.props.manga) {
      return <h1>Loading</h1>;
    }

    return <ChapterReader
      chapter={this.props.chapter}
      chapterId={this.props.chapter.id}
      mangaTitle={this.props.manga.name}
    />;
  }
}

const mapStateToProps = (state: any, props: RouteComponentProps<ParamsProps>) => {
  const { mangaId, chapterId } = props.match.params;

  return {
    manga: manga.filters.getManga(state, mangaId),
    chapter: manga.filters.getChapter(state, mangaId, chapterId),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      loadChapter: manga.actions.loadChapter,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
