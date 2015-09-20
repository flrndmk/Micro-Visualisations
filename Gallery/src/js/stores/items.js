var Reflux = require('reflux'),
  _clean = require('underscore.string/clean'),
  _include = require('underscore.string/include'),
  _isBlank = require('underscore.string/isBlank'),
  filterAction = require('../actions/filter'),
  initAction = require('../actions/init'),
  filterStore = require('../stores/filter');

module.exports = Reflux.createStore({
  items : [],
  loaded : false,
  amount : 0,
  displayed : 0,

  init : function() {
    this.listenTo(filterStore, this.filter);
    this.listenTo(initAction.completed, this.setItems); // Wird in init.js getriggert
    initAction();
  },
  setItems : function(data) {
    this.items = data;
    this.loaded = true;
    this.amount = data.length;
    this.displayed = data.length;

    filterStore.applyFilter();
  },
  getAmount : function() {
    return this.displayed;
  },
  filter : function(filter) {
    var cats = [];
    if (filter.state.taxCatIntMod) { cats.push("taxCatIntMod") };
    if (filter.state.taxCatIntAdd) { cats.push("taxCatIntAdd") };
    if (filter.state.taxCatAdjMod) { cats.push("taxCatAdjMod") };
    if (filter.state.taxCatAdjAdd) { cats.push("taxCatAdjAdd") };
    if(cats.length == 0 || cats.length == 4) {
      cats = false;
    }

    var dataSource = [];
    if (filter.state.daInn) { dataSource.push("daInn") };
    if (filter.state.daInt) { dataSource.push("daInt") };
    if (filter.state.daExt) { dataSource.push("daExt") };
    if(dataSource.length == 0 || dataSource.length == 3) {
      dataSource = false;
    }

    var mediumType = [];
    if (filter.state.print) { mediumType.push("print") };
    if (filter.state.web) { mediumType.push("web") };
    if (filter.state.app) { mediumType.push("app") };
    if(mediumType.length == 0 || mediumType.length == 3) {
      mediumType = false;
    }

    var ft = _clean(filter.state.search.toLowerCase());

    var items = _.filter(this.items, function(item) {

      if(!item.isInteractive && filter.state.isInteractive) {
        return false;
      }

      if(dataSource) {
        if (!_.intersection(dataSource, item.dataSource).length) {
          return false;
        }
      }

      if(mediumType) {
        if (!_.intersection(mediumType, item.mediumType).length) {
          return false;
        }
      }

      if(cats) {
        if (!_.intersection(cats, item.taxCat).length) {
          return false;
        }
      }

      if(!_isBlank(ft)) {
        if(_.isString(item.titleLong) && _include(item.titleLong.toLowerCase(), ft)) { return true; }
        if(_.isString(item.description) && _include(item.description.toLowerCase(), ft)) { return true; }
        if(_.isString(item.authorLong) && _include(item.authorLong.toLowerCase(), ft)) { return true; }
        if(_.isString(item.url) && _include(item.url.toLowerCase(), ft)) { return true; }     

        // Search for category
        // Search Ranking

        return false;
      }

      return true;
    });

    this.displayed = items.length;

    this.trigger(items);
  },
  getSingleData: function(id) {
    return _.find(this.items, function(item) { return item.id == id; });
  },
  getInitialState : function() {
    return this.items;
  }
});