import * as React from 'react';

const styles = require('./styles.css');

interface SearchProps {
  onChange: (value: string) => any;
  value: string | undefined;
}

export default class Search extends React.Component<SearchProps, {}> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  }

  render() {
    return <label className={styles.root}>
      <span className={styles.label}>Filter by name</span>
      <input
        value={this.props.value}
        onChange={this.handleChange}
        className={styles.input}
        type="text"
        placeholder="My favorite manga"
      />
    </label>;
  }
}
