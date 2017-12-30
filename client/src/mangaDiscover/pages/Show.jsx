import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'

import * as manga from '../../manga'
import Layout from '../components/Layout'
import Header from '../../components/Header'
import MangaShow from '../components/MangaShow'

class Show extends React.Component {
  async componentWillMount() {
    this.props.loadManga(this.props.mangaId).catch(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.props
            .loadManga(this.props.mangaId)
            .then(resolve)
            .catch(reject)
        }, 3000)
      })
    })
  }

  renderHeader() {
    return <Header withBackNavigation="/" />
  }

  render() {
    if (!this.props.manga) {
      return null
    }

    return (
      <Layout header={this.renderHeader()}>
        <MangaShow
          ongoingChapter={this.props.ongoingChapter}
          readChapters={this.props.readChapters}
          manga={this.props.manga}
        />
      </Layout>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { mangaId } = props.match.params

  return {
    ongoingChapter: manga.filters.getOngoingChapter(state, mangaId),
    manga: manga.filters.getManga(state, mangaId),
    readChapters: manga.filters.getReadChaptersForManga(state, mangaId),
    mangaId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadManga: manga.actions.loadManga
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Show))
