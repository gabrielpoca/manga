import * as React from 'react';
import { Query } from '../../api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as manga from '../../manga';
import ChapterReader from '../components/ChapterReader';
import Loading from '../components/Loading';

const CHAPTER_QUERY = `
  query($mangaId: String!, $chapterId: ID!) {
    chapter(mangaId: $mangaId, chapterId: $chapterId) {
      name
      mangaId
      chapterId
      pages {
        pageId
        src
      }
    }

    manga(mangaId: $mangaId) {
      name
      mangaId
      cover
      chapters {
        name
        chapterId
        mangaId
      }
    }
  }
`;

class Show extends React.Component {
  componentDidMount() {
    this.markChapterReading(this.props);
  }

  componentWillReceiveProps(props) {
    this.markChapterReading(props);
  }

  markChapterReading = props => {
    const { mangaId, chapterId } = props.match.params;

    if (props.ongoingChapter === chapterId) return;

    this.props.readingChapter(mangaId, chapterId);
  };

  markChapterReader = () => {
    const { mangaId, chapterId } = this.props.match.params;

    this.props.readChapter(mangaId, chapterId);
  };

  render() {
    return (
      <Query query={CHAPTER_QUERY} variables={this.props.match.params}>
        {({ loading, data }) => {
          if (loading) {
            return (
              <Loading
                manga={this.props.manga || {}}
                chapterId={this.props.match.params.chapterId}
              />
            );
          }

          return (
            <ChapterReader
              chapter={data.chapter}
              manga={data.manga}
              onScrollToBottom={this.markChapterReader}
            />
          );
        }}
      </Query>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      readingChapter: manga.actions.readingChapter,
      readChapter: manga.actions.readChapter
    },
    dispatch
  );
};

const mapStateToProps = (state, props) => {
  return {
    ongoingChapter: manga.filters.getOngoingChapter(
      state,
      props.match.params.mangaId
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
