var React = require('react'),
  Reflux = require('reflux'),
  _prune = require('underscore.string/prune'),
  detailAction = require('../actions/detail'),
  detailStore = require('../stores/detail'),
  config = require('../../config.json');

module.exports = React.createClass({
  tooltips : [],

  detail: function(e) {
    detailAction(parseInt(e.currentTarget.id));
  },
  render: function() {

    if(!this.tooltips.length) {
      $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
      });
    }
      
    return (
      <div className="col-sm-6 col-lg-4">
        <div className="item" id={this.props.item.id} onClick={this.detail}>
          <img className="cover" src={config.imgPathItems + this.props.item.thumbnail} />
          <div className="description">
            <h2 className={this.props.item.taxCat[0]}>{_prune(this.props.item.titleShort, 30)}</h2>
            <div className="row bottom">
              <div className="col-xs-6 text-left">
                {this.props.item.dataSource.map(function(n){
                  return <img src={config.imgPath + config.filter.dataSource[n].icon} className="icon" data-toggle="tooltip" data-placement="top" title={config.filter.dataSource[n].description} />;
                })}
              </div>
              <div className="col-xs-6 text-right">
                {this.props.item.mediumType.map(function(n){
                  return <img src={config.imgPath + config.filter.mediumType[n].icon} className="icon" data-toggle="tooltip" data-placement="top" title={config.filter.mediumType[n].description} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});