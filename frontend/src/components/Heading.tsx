import { omit } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { fontSize } from '../styles';

export enum Level {
  h1,
  h2,
  h3,
  h4,
  none
}

interface Props {
  level: Level;
}

const Heading = (props: Props) => {
  const childProps = omit(props, 'level');
  switch (props.level) {
    case Level.h1:
      return <h1 {...childProps} />;
    case Level.h2:
      return <h2 {...childProps} />;
    case Level.h3:
      return <h3 {...childProps} />;
    case Level.h4:
      return <h4 {...childProps} />;
    case Level.none:
      return <span {...childProps} />;
    default:
      return <h1 {...childProps} />;
  }
};

export const H1 = styled(Heading)`
  color: var(--text-color);
  font-size: ${fontSize.large};
  text-transform: uppercase;
`;

export const H2 = styled(H1)`
  font-size: ${fontSize.normal};
`;

export const H3 = styled(H1)`
  font-size: ${fontSize.small};
`;
