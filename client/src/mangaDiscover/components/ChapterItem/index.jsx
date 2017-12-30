import * as React from 'react';
import { Link } from 'react-router-dom';

const readIcon = require('./read.svg');
const styles = require('./styles.css');

export default class ChapterItem extends React.Component {
  get chapterId() {
    return this.props.chapter.id;
  }

  get name() {
    return this.props.chapter.name;
  }

  renderName() {
    if (this.name) {
      return `${this.chapterId}. ${this.name}`;
    } else {
      return `Chapter ${this.chapterId}`;
    }
  }

  renderReadMark() {
    if (!this.props.showRead) {
      return;
    }

    return (
      <span className={styles.read}>
        {this.props.read &&
          <span dangerouslySetInnerHTML={{ __html: readIcon }} />}
      </span>
    );
  }

  render() {
    return (
      <div className={styles.root} key={this.chapterId}>
        {this.renderReadMark()}
        <Link
          className={styles.title}
          to={`/manga/${this.props.id}/chapter/${this.chapterId}`}
        >
          {this.renderName()}
        </Link>
      </div>
    );
  }
}
