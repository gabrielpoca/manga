import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, fontSize } from '../../styles';

import * as manga from '../../manga';

const Root = styled.div`
`;

const Title = styled(Link)`
  text-decoration: none;
  font-size: ${fontSize.small};
  color: ${color.black};
`;

interface Props {
  id: string;
  cached: boolean;
  chapter: manga.interfaces.Chapter;
  onOffline?: (chapterId: string) => void;
}

export default class ChapterItem extends React.Component<Props, null> {
  shouldComponentUpdate(props: Props) {
    return props.cached !== this.props.cached;
  }

  get chapterId() {
    return this.props.chapter.id;
  }

  get name() {
    return this.props.chapter.name;
  }

  handleOffline = () => {
    if (this.props.onOffline) {
      this.props.onOffline(this.props.chapter.id + '');
    }
  }

  renderOfflineButton() {
    if (!this.props.onOffline) {
      return null;
    }

    return <button onClick={this.handleOffline}>
      Make Offline
    </button>;
  }

  render() {
    return <Root key={this.chapterId}>
      <Title to={`/manga/${this.props.id}/chapter/${this.chapterId}`}>
        Chapter {this.chapterId}. {this.name}
      </Title>
      {this.props.cached ? 'Cached' : ''}
      {this.renderOfflineButton()}
    </Root>;
  }
}
