var React = require('react'),
  Reflux = require('reflux'),
  filterAction = require('../actions/filter'),
  filterStore = require('../stores/filter'),
  itemsStore = require('../stores/items'),
  config = require('../../config.json');

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
  popover : [],
  tooltip : [],
  mixins: [Reflux.connect(filterStore, 'filter')],

  handleChange: function() {
    var filter = {
      isInteractive : this.refs.isInteractiveInput.getDOMNode().checked,
      taxCatIntMod : this.refs.taxCatIntModInput.getDOMNode().checked,
      taxCatIntAdd : this.refs.taxCatIntAddInput.getDOMNode().checked,
      taxCatAdjMod : this.refs.taxCatAdjModInput.getDOMNode().checked,
      taxCatAdjAdd : this.refs.taxCatAdjAddInput.getDOMNode().checked,
      daInn : this.refs.daInnInput.getDOMNode().checked,
      daInt : this.refs.daIntInput.getDOMNode().checked,
      daExt : this.refs.daExtInput.getDOMNode().checked,
      print : this.refs.printInput.getDOMNode().checked,
      web : this.refs.webInput.getDOMNode().checked,
      app : this.refs.appInput.getDOMNode().checked
    };
    filterAction(filter);
  },
  getBackgroundFill: function(_arr) {
    var max = _.max(_arr),
      arr = [];

    _.each(_arr, function(n) {
      var i = parseInt(n.domainMap(0, max, 0, 100)) + '%';
      arr.push({background: 'linear-gradient(0deg, #fcfcfc 0%, #f3f3f2 ' + i + ', white ' + i + ')'});
    })

    return arr;
  },
  render: function() {
    var btnClass = 'btn btn-primary';

    var bgType = this.getBackgroundFill([this.state.filter.value.taxCatIntMod,this.state.filter.value.taxCatIntAdd,this.state.filter.value.taxCatAdjMod,this.state.filter.value.taxCatAdjAdd]);
    var bgData = this.getBackgroundFill([this.state.filter.value.daInn,this.state.filter.value.daInt,this.state.filter.value.daExt]);
    var bgMedium = this.getBackgroundFill([this.state.filter.value.print,this.state.filter.value.web,this.state.filter.value.app]);
    var bgInteractivity = this.getBackgroundFill([this.state.filter.value.isInteractive,itemsStore.getAmount()]);


    if(!this.popover.length) {
      $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
      })
    }

    if(!this.tooltip.length) {
      $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
      })
    }

    return (
      <form>
        <h2>Filter</h2>
        <h3>Type of application <i className="glyphicon glyphicon-info-sign" data-toggle="popover" data-content="This distinguishes the type of application in which the micro visualisation is used." aria-hidden="true"></i></h3>
        <table>
          <tr>
            <td className="taxCatIntMod">
              <label className={this.state.filter.state.taxCatIntMod ? 'active' : ''} style={bgType[0]}>
                <input
                  className="taxCat"
                  type="checkbox"
                  autoComplete="off"
                  checked={this.state.filter.state.taxCatIntMod}
                  ref="taxCatIntModInput"
                  onChange={this.handleChange}
                />
                <span dangerouslySetInnerHTML={{__html: config.filter.taxCat.taxCatIntMod.name.replace(" ", "<br />")}}></span> <small>({this.state.filter.value.taxCatIntMod})</small>
              </label>
            </td>
            <td className="taxCatIntAdd">
              <label className={this.state.filter.state.taxCatIntAdd ? 'active' : ''} style={bgType[1]}>
                <input
                  className="taxCat"
                  type="checkbox"
                  autoComplete="off"
                  checked={this.state.filter.state.taxCatIntAdd}
                  ref="taxCatIntAddInput"
                  onChange={this.handleChange}
                />
                <span dangerouslySetInnerHTML={{__html: config.filter.taxCat.taxCatIntAdd.name.replace(" ", "<br />")}}></span> <small>({this.state.filter.value.taxCatIntAdd})</small>
              </label>
            </td>
          </tr>
          <tr>
            <td className="taxCatAdjMod">
              <label className={this.state.filter.state.taxCatAdjMod ? 'active' : ''} style={bgType[2]}>
                <input
                  className="taxCat"
                  type="checkbox"
                  autoComplete="off"
                  checked={this.state.filter.state.taxCatAdjMod}
                  ref="taxCatAdjModInput"
                  onChange={this.handleChange}
                />
                <span dangerouslySetInnerHTML={{__html: config.filter.taxCat.taxCatAdjMod.name.replace(" ", "<br />")}}></span> <small>({this.state.filter.value.taxCatAdjMod})</small>
              </label>
            </td>
            <td className="taxCatAdjAdd">
              <label className={this.state.filter.state.taxCatAdjAdd ? 'active' : ''} style={bgType[3]}>
                <input
                  className="taxCat"
                  type="checkbox"
                  autoComplete="off"
                  checked={this.state.filter.state.taxCatAdjAdd}
                  ref="taxCatAdjAddInput"
                  onChange={this.handleChange}
                />
                <span dangerouslySetInnerHTML={{__html: config.filter.taxCat.taxCatAdjAdd.name.replace(" ", "<br />")}}></span> <small>({this.state.filter.value.taxCatAdjAdd})</small>
              </label>
            </td>
          </tr>
        </table>
        <h3>Data Source <i className="glyphicon glyphicon-info-sign" data-toggle="popover" data-content="This distinguishes the source from which the data for the visualisation is comming from." aria-hidden="true"></i></h3>
        <div className="btn-group">
          <label className={this.state.filter.state.daInn ? btnClass + ' active' : btnClass} style={bgData[0]} data-toggle="tooltip" data-placement="top" title={config.filter.dataSource.daInn.description}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={this.state.filter.state.daInn}
              ref="daInnInput"
              onChange={this.handleChange}
            />
            <img src={config.imgPath + config.filter.dataSource.daInn.icon} className="icon" />
            {config.filter.dataSource.daInn.name} <small>({this.state.filter.value.daInn})</small>
          </label>
          <label className={this.state.filter.state.daInt ? btnClass + ' active' : btnClass} style={bgData[1]} data-toggle="tooltip" data-placement="top" title={config.filter.dataSource.daInt.description}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={this.state.filter.state.daInt}
              ref="daIntInput"
              onChange={this.handleChange}
            />
            <img src={config.imgPath + config.filter.dataSource.daInt.icon} className="icon" />
            {config.filter.dataSource.daInt.name} <small>({this.state.filter.value.daInt})</small>
          </label>
          <label className={this.state.filter.state.daExt ? btnClass + ' active' : btnClass} style={bgData[2]} data-toggle="tooltip" data-placement="top" title={config.filter.dataSource.daExt.description}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={this.state.filter.state.daExt}
              ref="daExtInput"
              onChange={this.handleChange}
            />
            <img src={config.imgPath + config.filter.dataSource.daExt.icon} className="icon" />
            {config.filter.dataSource.daExt.name} <small>({this.state.filter.value.daExt})</small>
          </label>
        </div>
        <h3>Medium Type <i className="glyphicon glyphicon-info-sign" data-toggle="popover" data-content="This distinguishes the medium in which the micro visualisation is used." aria-hidden="true"></i></h3>
        <div className="btn-group">
          <label className={this.state.filter.state.print ? btnClass + ' active' : btnClass} style={bgMedium[0]} data-toggle="tooltip" data-placement="top" title={config.filter.mediumType.print.description}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={this.state.filter.state.print}
              ref="printInput"
              onChange={this.handleChange}
            />
            <img src={config.imgPath + config.filter.mediumType.print.icon} className="icon" />
            {config.filter.mediumType.print.name} <small>({this.state.filter.value.print})</small>
          </label>
          <label className={this.state.filter.state.web ? btnClass + ' active' : btnClass} style={bgMedium[1]} data-toggle="tooltip" data-placement="top" title={config.filter.mediumType.web.description}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={this.state.filter.state.web}
              ref="webInput"
              onChange={this.handleChange}
            />
            <img src={config.imgPath + config.filter.mediumType.web.icon} className="icon" />
            {config.filter.mediumType.web.name} <small>({this.state.filter.value.web})</small>
          </label>
          <label className={this.state.filter.state.app ? btnClass + ' active' : btnClass} style={bgMedium[2]} data-toggle="tooltip" data-placement="top" title={config.filter.mediumType.app.description}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={this.state.filter.state.app}
              ref="appInput"
              onChange={this.handleChange}
            />
            <img src={config.imgPath + config.filter.mediumType.app.icon} className="icon" />
            {config.filter.mediumType.app.name} <small>({this.state.filter.value.app})</small>
          </label>
        </div>
        <h3>Interactivity <i className="glyphicon glyphicon-info-sign" data-toggle="popover" data-content="This distinguishes whether the micro visualisation is interactive or not." aria-hidden="true"></i></h3>
        <div className="btn-group wide">
          <label className={this.state.filter.state.isInteractive ? btnClass + ' active' : btnClass} style={bgInteractivity[0]} data-toggle="tooltip" data-placement="top" title={config.filter.isInteractive.description}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={this.state.filter.state.isInteractive}
              ref="isInteractiveInput"
              onChange={this.handleChange}
            />
            {' '}
            {config.filter.isInteractive.name} <small>({this.state.filter.value.isInteractive})</small>
          </label>
        </div>
      </form>
    );
  }
});