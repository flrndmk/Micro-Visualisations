var Reflux = require('reflux'),
  detailAction = require('../actions/detail'),
  detailStore = require('../stores/detail'),
  itemsStore = require('../stores/items');

module.exports = Reflux.createStore({
  init : function() {
    this.listenTo(detailAction, this.showDetail);
  },
  showDetail : function(id) {
    var item = itemsStore.getSingleData(id);

    if(!_.isUndefined(item)) {
      this.trigger(item);
    }
  }
});