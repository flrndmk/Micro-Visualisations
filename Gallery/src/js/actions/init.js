var Reflux = require('reflux');

var initAction = Reflux.createAction({ asyncResult: true });

initAction.listen(function() {
  $.ajax('data/items.json')
    .then(initAction.completed) // Wird von Store items.js abgefangen
    .fail(initAction.failed);
});

module.exports = initAction;