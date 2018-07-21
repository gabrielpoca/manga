import React from 'react';
import { connect } from 'react-redux';
import { filter, sortBy, includes } from 'lodash';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as manga from '../../manga';
import Search from '../containers/Search';
import Layout from '../components/Layout';
import MangaList from '../components/MangaList';
import EmptyMangaList from '../components/EmptyMangaList';
import Header from '../../components/Header';

const MANGAS_QUERY = gql`
  query {
    mangas {
      name
      mangaId
      cover
    }
  }
`;

class Page extends React.Component {
  sortMangas = mangas => {
    return sortBy(
      mangas,
      manga => (includes(this.props.ongoingMangas, manga.mangaId) ? 0 : 1)
    );
  };

  limitMangas = mangas => {
    return mangas.slice(0, 40);
  };

  getMangasFromData = ({ mangas }, searchQuery) => {
    if (!!searchQuery) {
      const newMangas = filter(
        mangas,
        manga =>
          manga.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );

      return this.limitMangas(this.sortMangas(newMangas));
    } else {
      return this.limitMangas(this.sortMangas(mangas));
    }
  };

  renderHeader({ onBlur, onSearch, query }) {
    return <Header onChange={onSearch} onBlur={onBlur} search={query} />;
  }

  render() {
    return (
      <Search {...this.props}>
        {({ active, query, onSearch, onBlur }) => (
          <Layout header={this.renderHeader({ onBlur, onSearch, query })}>
            <Query query={MANGAS_QUERY}>
              {({ data, loading }) => {
                if (loading) {
                  return <EmptyMangaList hasQuery={active} />;
                }

                return (
                  <MangaList mangas={this.getMangasFromData(data, query)} />
                );
              }}
            </Query>
          </Layout>
        )}
      </Search>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { ongoingMangas: manga.filters.getOngoingMangas(state) };
};

export default connect(mapStateToProps)(Page);
