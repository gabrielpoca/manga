import styled from 'styled-components';
import * as Color from 'color';
import { color, fontSize } from '../styles';

export default styled.button`
  background-color: var(--color-black);
  border: none;
  color: var(--color-white);
  cursor: pointer;
  font-size: ${fontSize.normal};
  height: 48px;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: ${Color(color.darkBlue).darken(.5).toString()};
  }
`;
