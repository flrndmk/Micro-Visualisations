var React = require('react'),
  Listings = require('./listings'),
  Aside = require('./aside'),
  Modal = require('./modal');

React.render(
  <Listings />,
  document.getElementById('listings')
);

React.render(
  <Aside />,
  document.getElementById('filter')
);

React.render(
  <Modal />,
  $('#detailModal div')[0]
);

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    console.log('toggle')
    $("#wrapper").toggleClass("toggled");
});