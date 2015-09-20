var React = require('react'),
  Reflux = require('reflux'),
  Item = require('./item'),
  Search = require('./search'),
  countAction = require('../actions/count'),
  initAction = require('../actions/init'),
  itemsStore = require('../stores/items');

Number.prototype.domainMap = function(minValue, maxValue, minNorm, maxNorm) {
  //console.log(this - 0, minValue, maxValue, minNorm, maxNorm);
  if(this <= minValue) {
    return minNorm;
  }
  else if(this >= maxValue) {
    return maxNorm;
  }
  return (((maxNorm-minNorm)*((this-minValue)/(maxValue-minValue)))+minNorm);
};

module.exports = React.createClass({
    mixins: [Reflux.connect(itemsStore, 'items')], // Funktion Render mit Object items

    render: function() {

      var maxNorm = $('.vis').width();
      var maxValue = itemsStore.amount;
      
      countAction(this.state.items);
      var items = [];

      this.state.items.forEach(function(item) {
          items.push(<Item item={item} key={item.title} />);
      });

      var length = items.length;

      if(_.isUndefined(length) || !length) {
        items = itemsStore.loaded ?
          <div className="col-xs-12 text-center"><p className="bg-warning">No item matches your criteria.</p></div> :
          <div className="col-xs-12 text-center"><img src="img/loading-spinning-bubbles.svg" /></div>

        length = 0;
      }

      return (
        <section>
          <div className="row infobar">
            <div className="col-md-9">
              <p><strong>{length}</strong> <small>(of {itemsStore.amount})</small> micro visualisation{(length > 1) ? 's' : ''} displayed</p>
            </div>
            <div className="col-md-3 text-right">
              <Search />
            </div>
            <div className="col-md-12 vis">
              <svg width={maxNorm} height="2">
                <line x1="0" y1="2" x2={length.domainMap(0, maxValue, 0, maxNorm )} y2="2" className="percent" />
                <line x1="0" y1="2" x2={maxNorm} y2="2" className="total" />
              </svg>
            </div>
          </div>
          <div className="row">
            {items}
          </div>
        </section>
      );
    }
});