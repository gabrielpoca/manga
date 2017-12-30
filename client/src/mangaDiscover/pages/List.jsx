import { filter, find } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from '../components/Layout'
import MangaList from '../components/MangaList'
import EmptyMangaList from '../components/EmptyMangaList'
import Header from '../../components/Header'
import * as manga from '../../manga'
import * as notifications from '../../notifications'

class Page extends React.Component {
  constructor(props) {
    super()

    this.state = {
      query: props.match.params.query || ''
    }
  }

  async componentDidMount() {
    this.props.loadAll().catch(() => {
      if (this.props.mangas.length === 0) {
        this.props.sendNotification(
          'error',
          'Something is wrong and I cannot reach server. Connecting to the internet should solve this problem. If not, try again in a few minutes.'
        )
      }
    })
  }

  componentWillReceiveProps(props) {
    this.setState({ query: props.match.params.query || '' })
  }

  hasQuery = () => this.state.query && this.state.query !== ''

  mangas = () => {
    if (this.hasQuery()) {
      const query = this.state.query

      return filter(this.props.mangas, manga => {
        return manga.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      }).map(manga => {
        const foundOngoing = find(this.props.ongoingMangas, { id: manga.id })
        return foundOngoing || manga
      })
    } else {
      return this.props.ongoingMangas
    }
  }

  mangasPage = () => {
    return this.mangas().slice(0, 40)
  }

  handleSearch = query => this.setState({ query })

  handleSearchBlur = () => {
    if (this.state.query !== this.props.match.params.query) {
      this.props.history.push(`/${this.state.query}`)
    }
  }

  renderHeader() {
    return (
      <Header
        onChange={this.handleSearch}
        onBlur={this.handleSearchBlur}
        search={this.state.query}
      />
    )
  }

  render() {
    const mangas = this.mangasPage()

    if (mangas.length === 0) {
      return (
        <Layout header={this.renderHeader()}>
          <EmptyMangaList hasQuery={this.hasQuery()} />
        </Layout>
      )
    }

    return (
      <Layout header={this.renderHeader()}>
        <MangaList mangas={this.mangasPage()} />
      </Layout>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    mangas: manga.filters.getMangas(state),
    ongoingMangas: manga.filters.getOngoingMangas(state)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadAll: manga.actions.loadAll,
      sendNotification: notifications.actions.sendNotification
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
