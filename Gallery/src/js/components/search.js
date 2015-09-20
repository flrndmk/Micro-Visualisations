var React = require('react'),
  Reflux = require('reflux'),
  filterAction = require('../actions/filter'),
  filterStore = require('../stores/filter'),
  config = require('../../config.json');

module.exports = React.createClass({
  mixins: [Reflux.connect(filterStore, 'filter')],

  handleChange: function() {
    var filter = {
      search : this.refs.searchInput.getDOMNode().value
    };
    filterAction(filter);
  },
  render: function() {
    return (
      <input
        type="text"
        placeholder={config.filter.search.name}
        value={this.state.filter.search}
        ref="searchInput"
        onChange={this.handleChange}
      />
    );
  }
});