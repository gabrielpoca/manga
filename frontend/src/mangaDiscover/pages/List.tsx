import { filter, throttle } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';

import MangaList from '../components/MangaList';
import * as manga from '../../manga';

interface ListProps {
  loadAll: typeof manga.actions.loadAll;
  mangas: Array<manga.interfaces.MangaPreview>;
}

interface ListState {
  query: string;
}

class List extends React.Component<ListProps & RouteComponentProps<{}>, ListState> {
  constructor() {
    super();

    this.state = {
      query: '',
    };
  }

  async componentWillMount() {
    this.props.loadAll();
  }

  mangas = () => {
    const query = this.state.query;

    if (query) {
      return filter(this.props.mangas, manga => {
        return manga.name.toLowerCase()
          .indexOf(query.toLowerCase()) !== -1;
      });
    } else {
      return this.props.mangas;
    }
  }

  mangasPage = throttle(() => {
    return this.mangas().slice(0, 40);
  }, 150, { leading: true, trailing: true });

  handleChange = (query: string) => {
    this.setState({ query });
  }

  render () {
    return <MangaList
      onSearch={this.handleChange}
      mangas={this.mangasPage()}
      search={this.state.query}
    />;
  }
}

const mapStateToProps = (state: any) => {
  return {
    mangas: manga.filters.getMangas(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      loadAll: manga.actions.loadAll,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
