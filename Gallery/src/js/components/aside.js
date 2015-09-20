var React = require('react'),
  Reflux = require('reflux'),
  Filter = require('./filter');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <Filter />
            </div>
        );
    }
});