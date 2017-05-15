import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { color, fontSize } from './styles';
import MangaDiscover from './mangaDiscover';
import MangaReader from './mangaReader';

import './styles.css';

class App extends React.Component<{}, {}> {
  render() {
    return <Router>
      <Switch>
        <Route
          path="/manga/:mangaId/chapter/:chapterId"
          component={MangaReader}
        />
        <Route path="/" component={MangaDiscover} />
      </Switch>
    </Router>;
  }
}

export default App;
