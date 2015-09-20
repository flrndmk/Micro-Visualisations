var React = require('react'),
  Reflux = require('reflux'),
  marked = require('marked'),
  _slugify = require("underscore.string/slugify"),
  detailAction = require('../actions/detail'),
  detailStore = require('../stores/detail');

module.exports = React.createClass({
  mixins: [Reflux.connect(detailStore, 'item')],

  render: function() {
    if(!_.isUndefined(this.state.item)) {

      var title = (this.state.item.titleLong) ? <h4 className="modal-title">{this.state.item.titleLong}</h4> : (this.state.item.titleShort) ? <h4 className="modal-title">by {this.state.item.titleShort}</h4> : '';
      var author = (this.state.item.authorLong) ? <small>by {this.state.item.authorLong}</small> : (this.state.item.authorShort) ? <small>by {this.state.item.authorShort}</small> : '';
      var img = (this.state.item.thumbnail) ? <img className="cover" src={config.imgPathItems + this.state.item.thumbnail} /> : '';
      var description = (this.state.item.description) ? <p>{this.state.item.description}</p> : '';
      var url = (this.state.item.url) ? (this.state.item.urlTitle) ? <a href={this.state.item.url}>{this.state.item.urlTitle}</a> : <a href={this.state.item.url}>{this.state.item.url}</a> : '';
      var paperRef = (this.state.item.paperUrl) ? (this.state.item.paperTitle) ? <a href={this.state.item.paperUrl}>{this.state.item.paperTitle}</a> : <a href={this.state.item.paperUrl}>{this.state.item.paperUrl}</a> : '';
      paperRef = paperRef ? <span>Paper: {paperRef}</span> : '';
      var description = marked(this.state.item.description.toString(), {sanitize: true});
      var slugDescription = _slugify(this.state.item.titleLong);

      $('#detailModal').modal();
      return (
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            {title}
            {author}
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-3">
                {img}
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-4">
                    <ul>
                      {this.state.item.dataSource.map(function(n){
                        return <li><img src={config.imgPath + config.filter.dataSource[n].icon} className="icon" data-toggle="tooltip" data-placement="top" title={config.filter.dataSource[n].description} /> {config.filter.dataSource[n].description}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <ul>
                      {this.state.item.mediumType.map(function(n){
                        return <li><img src={config.imgPath + config.filter.mediumType[n].icon} className="icon" data-toggle="tooltip" data-placement="top" title={config.filter.mediumType[n].description} /> {config.filter.mediumType[n].description}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-md-4">
                    {' '}
                  </div>
                </div>
                <div className="row description">
                  <div className="col-md-12" dangerouslySetInnerHTML={{__html: description}} />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {paperRef}
                  </div>
                  <div className="col-md-6 text-right">
                    {url}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">New message</h4>
          </div>
          <div className="modal-body">
            Bei der Anfrage ist ein Fehler aufgetreten.
          </div>
        </div>
      );
    }

  }
});