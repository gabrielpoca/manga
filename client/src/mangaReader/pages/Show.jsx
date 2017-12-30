import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ChapterReader from '../components/ChapterReader'
import Loading from '../components/Loading'
import * as manga from '../../manga'

class Show extends React.Component {
  componentWillMount() {
    this.loadManga(this.props, true)
  }

  componentWillReceiveProps(props) {
    this.loadManga(props)
  }

  loadManga(props, force) {
    const { mangaId, chapterId } = props.match.params

    if (force || mangaId !== this.props.match.params.mangaId) {
      this.props.loadManga(mangaId)
    }

    if (force || chapterId !== this.props.match.params.chapterId) {
      this.props.loadChapter(mangaId, parseInt(chapterId, 10))
      this.props.readingChapter(mangaId, parseInt(chapterId, 10))
    }
  }

  markChapterReader = () => {
    const { mangaId, chapterId } = this.props.match.params

    this.props.readChapter(mangaId, parseInt(chapterId, 10))
  }

  render() {
    if (!this.props.chapter || !this.props.manga) {
      return (
        <Loading
          manga={this.props.manga}
          chapterId={this.props.match.params.chapterId}
        />
      )
    }

    return (
      <ChapterReader
        chapter={this.props.chapter}
        chapterId={this.props.chapter.id}
        manga={this.props.manga}
        onScrollToBottom={this.markChapterReader}
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  const { mangaId, chapterId } = props.match.params

  return {
    manga: manga.filters.getManga(state, mangaId),
    chapter: manga.filters.getChapter(state, mangaId, chapterId)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadChapter: manga.actions.loadChapter,
      loadManga: manga.actions.loadManga,
      readingChapter: manga.actions.readingChapter,
      readChapter: manga.actions.readChapter
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
