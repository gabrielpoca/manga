import React from 'react';
import { GraphQLClient } from 'graphql-request';

// const APIContext = React.createContext();
const client = new GraphQLClient('http://localhost:4000/api', {});

// class APIProvider extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       request: this.request
//     };
//   }

//   request = (query, variables = {}) => client.request(query, variables);

//   render() {
//     return (
//       <APIContext.Provider value={this.state}>
//         {this.props.children}
//       </APIContext.Provider>
//     );
//   }
// }

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
    this.setState({ loading: true });

    client
      .request(props.query, props.variables || {})
      .then(data => this.setState({ data, loading: false }))
      .catch(err => this.setState({ err, loading: false }));
  }

  render() {
    return this.props.children(this.state);
  }
}

export { Query };
