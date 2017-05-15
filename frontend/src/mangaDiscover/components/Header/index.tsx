import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const styles = require('./styles.css');

const Header = () => {
  return <header className={styles.root}>
    <Link className={styles.title} to="/">Manga Reader</Link>
  </header>;
};

export default Header;
