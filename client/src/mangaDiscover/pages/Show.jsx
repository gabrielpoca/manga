import * as React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as manga from '../../manga';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import MangaShow from '../components/MangaShow';

const MANGA_QUERY = gql`
  query($id: String!) {
    manga(mangaId: $id) {
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
  renderHeader() {
    return <Header withBackNavigation="/" />;
  }

  render() {
    return (
      <Layout header={this.renderHeader()}>
        <Query
          query={MANGA_QUERY}
          variables={{ id: this.props.match.params.mangaId }}
        >
          {({ loading, error, data }) => {
            if (loading) return null;

            return (
              <MangaShow
                ongoingChapter={this.props.ongoingChapter || false}
                readChapters={this.props.readChapters || []}
                manga={data.manga}
              />
            );
          }}
        </Query>
      </Layout>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    readChapters: manga.filters.getReadChaptersForManga(
      state,
      props.match.params.mangaId
    ),
    ongoingChapter: manga.filters.getOngoingChapter(
      state,
      props.match.params.mangaId
    )
  };
};

export default connect(mapStateToProps)(Show);
