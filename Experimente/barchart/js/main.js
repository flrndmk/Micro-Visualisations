// console.log('test');

// $( "body" ).keypress(function( event ) {
//   if ( event.which == 13 ) {
//      event.preventDefault();
//      $('html').style('background','red');
//   }
//   console.log('hello', event.which, e.shiftKey);

// });

var shifted;

$(document).bind('keyup keydown', function(e){
	shifted = e.shiftKey;
	style(shifted)
	console.log(shifted);
} );

function style (a) {
	if(a) {
		$('span.bg').addClass('active');
	}
	else {
		$('span.bg').removeClass('active');
	}
}

$('span.word').hover(function(e){
	var data = $(e.target).data('item');
	$('*[data-item=' + data + ']').addClass('active');

	console.log('test', data);
}, function() {
	$('span.word').removeClass('active')
});