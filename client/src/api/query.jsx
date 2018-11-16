import React from 'react';

import Context from './context';

class Query extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      data: {},
      error: null
    };
  }

  componentDidMount() {
    this.execute(this.props);
  }

  componentWillReceiveProps(props) {
    if (
      props.variables === this.props.variables &&
      props.query === this.props.query
    ) {
      return;
    }

    this.execute(props);
  }

  execute(props) {
    const timer = setTimeout(() => this.setState({ loading: true }), 100);

    props
      .request(props.query, props.variables || {})
      .then(data => {
        clearTimeout(timer);
        this.setState({ data, loading: false });
      })
      .catch(err => this.setState({ err, loading: false }));
  }

  render() {
    return this.props.children(this.state);
  }
}

class QueryWrapper extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {context => (
          <Query {...this.props} {...context}>
            {this.props.children}
          </Query>
        )}
      </Context.Consumer>
    );
  }
}

export default QueryWrapper;
