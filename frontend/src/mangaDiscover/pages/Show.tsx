import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import * as offlineCapabilities from '../../offlineCapabilities';
import * as manga from '../../manga';
import MangaShow from '../components/MangaShow';

interface ParamsProps {
  mangaId: string;
}

interface ShowProps {
  manga: manga.interfaces.MangaFull;
  mangaId: string;
  canWorkOffline: boolean;
  cachedChapters: Array<string>;
  loadManga: (mangaId: string) => any;
  cacheChapter: (mangaId: string, chapterId: string) => any;
}

interface ShowState {
  manga?: manga.interfaces.MangaFull;
}

class Show extends React.Component<ShowProps & RouteComponentProps<ParamsProps>, ShowState> {
  async componentWillMount() {
    this.props.loadManga(this.props.mangaId);
  }

  get canWorkOffline() {
    return this.props.canWorkOffline;
  }

  handleOffline = async (chapterId: string) => {
    if (!this.props.mangaId) {
      return;
    }

    this.props.cacheChapter(this.props.mangaId, chapterId);
  }

  render() {
    if (!this.props.manga) {
      return null;
    }

    return <MangaShow
      cachedChapters={this.props.cachedChapters}
      manga={this.props.manga}
      onOffline={this.canWorkOffline ? this.handleOffline : undefined}
    />;
  }
}

const mapStateToProps = (state: any, props: RouteComponentProps<ParamsProps>) => {
  const { mangaId } = props.match.params;
  const cachedChapters = manga.filters
    .getCachedChapters(state, mangaId)
    .map(chapter => chapter.id);

  return {
    canWorkOffline: offlineCapabilities.filters.canWorkOffline(state),
    manga: manga.filters.getManga(state, mangaId),
    mangaId,
    cachedChapters,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      cacheChapter: manga.actions.cacheChapter,
      loadManga: manga.actions.loadManga,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
