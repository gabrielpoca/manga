import * as React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { isArray } from 'lodash'

import ChapterItem from '../ChapterItem'
import Cover from '../Cover'
import Button from '../../../components/Button'
import ChaptersHeader from '../ChaptersHeader'
import { H1, H2 } from '../../../components/Heading'

import styles from './styles.css'

class MangaShow extends React.Component {
  get loadingStatus() {
    const chapters = this.props.manga.chapters

    if (isArray(chapters) && chapters.length === 0) {
      return 'empty'
    } else if (!chapters) {
      return 'loading'
    } else {
      return 'done'
    }
  }

  get hasReadChapters() {
    return this.props.readChapters.length > 0
  }

  renderButton = () => {
    const { manga, ongoingChapter } = this.props

    if (this.loadingStatus === 'loading') {
      return <H2>Loading...</H2>
    }

    if (this.loadingStatus !== 'done') {
      return
    }

    if (!ongoingChapter) {
      return (
        <Button tag={Link} to={`/manga/${manga.id}/chapter/1`}>
          Read
        </Button>
      )
    } else {
      return (
        <Button tag={Link} to={`/manga/${manga.id}/chapter/${ongoingChapter}`}>
          Chapter {ongoingChapter}
        </Button>
      )
    }
  }

  renderChapters() {
    const { manga, readChapters } = this.props
    const { id, chapters } = manga

    if (!isArray(chapters)) {
      return
    }

    if (chapters.length === 0) {
      return (
        <div className={styles.chapters}>
          <p>
            We cannot find any chapters for this manga. Please try again in a
            while.
          </p>
        </div>
      )
    } else {
      return (
        <div className={styles.chapters}>
          <ChaptersHeader showRead={this.hasReadChapters} />
          {chapters.map(chapter => (
            <ChapterItem
              showRead={this.hasReadChapters}
              read={readChapters.indexOf(chapter.id + '') !== -1}
              key={chapter.id}
              id={id}
              chapter={chapter}
            />
          ))}
        </div>
      )
    }
  }

  render() {
    const { manga } = this.props
    const { name, cover } = manga

    return (
      <div className="root">
        <div className={styles.image}>
          <Cover cover={cover} />
        </div>
        <div className={styles.details}>
          <div className={styles.title}>
            <H1 level="h1">{name}</H1>
          </div>
          {this.renderButton()}
        </div>
        {this.renderChapters()}
      </div>
    )
  }
}

export default CSSModules(MangaShow, styles)
