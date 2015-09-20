var Reflux = require('reflux'),
  itemsStore = require('../stores/items'),
  countAction = require('../actions/count'),
  filterAction = require('../actions/filter'),
  config = require('../../config.json');

module.exports = Reflux.createStore({
  filter : {
    state : {
      search : config.filter.search.state,
      isInteractive : config.filter.isInteractive.state,
      taxCatIntMod : config.filter.taxCat.taxCatIntMod.state,
      taxCatIntAdd : config.filter.taxCat.taxCatIntAdd.state,
      taxCatAdjMod : config.filter.taxCat.taxCatAdjMod.state,
      taxCatAdjAdd : config.filter.taxCat.taxCatAdjAdd.state,
      daInn : config.filter.dataSource.daInn.state,
      daInt : config.filter.dataSource.daInt.state,
      daExt : config.filter.dataSource.daExt.state,
      print : config.filter.mediumType.print.state,
      web : config.filter.mediumType.web.state,
      app : config.filter.mediumType.app.state
    },
    value : {
      isInteractive : 0,
      taxCatIntMod : 0,
      taxCatIntAdd : 0,
      taxCatAdjMod : 0,
      taxCatAdjAdd : 0,
      daInn : 0,
      daInt : 0,
      daExt : 0,
      print : 0,
      web : 0,
      app : 0
    }
  },
  init : function() {
    this.listenTo(filterAction, this.changeFilter);
    this.listenTo(countAction, this.changeValues);
  },
  changeFilter : function(_filter) {

    if (!_.isUndefined(_filter)) {
      _.each(_filter, function(n, i) {
        this.filter.state[i] = n;
      }, this)
    }

    this.trigger(this.filter);
  },
  changeValues : function() {

    var temp = _.mapObject(this.filter.value, function(val) {
      return 0;
    });

    if(arguments[0].length) {
      _.each(arguments[0], function(el) {
        if(el.isInteractive) { temp.isInteractive++; }

        var cats = ['dataSource', 'taxCat', 'mediumType'];

        _.each(cats, function(i) {
          _.each(el[i], function(n) {
            temp[n]++;
          });
        })

      });
    }

    if(!_.isEqual(temp, this.filter.value)) {
      this.filter.value = temp;
      this.trigger(this.filter);
    }
  },
  applyFilter : function() {
    this.trigger(this.filter);
  },
  getInitialState : function() {
    return this.filter;
  }
});