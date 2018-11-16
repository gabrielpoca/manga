import React from 'react';
import { GraphQLClient } from 'graphql-request';

import Context from './context';
import Query from './query';
import signature from './queryToID';
import Cache from './cache';

const cache = new Cache();
const client = new GraphQLClient('http://localhost:4000/api', {});

class Provider extends React.Component {
  constructor() {
    super();

    this.state = {
      context: {
        request: this.request
      }
    };
  }

  request = (query, variables) => {
    const data = cache.get(signature(query, variables));

    console.log(signature(query, variables), data);

    if (data) {
      this.setState({ loading: false, data });
      return new Promise(resolve => resolve(data));
    }

    return client.request(query, variables).then(data => {
      cache.save(signature(query, variables), data);
      return data;
    });
  };

  render() {
    return (
      <Context.Provider value={this.state.context}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Query, Provider };
