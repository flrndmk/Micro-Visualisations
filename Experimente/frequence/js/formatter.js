jQuery(function ($) {
	function browserTypeset() {

		var dataset;

		d3.csv("datatest.csv", function(data) {
			dataset = data.map(function(d) { return d.word; });
			console.log(dataset);

			colorWords();
		});

		var $original = $('p'),
			scale = d3.scale.linear().range(['#7FAF1B','#F02311']);

		$original.each(function(i, el) {
			var $el = $(el);

			$el.wordify();

		});

		function colorWords () {
			var position,
				$words = $('.word'),
				len = $words.length;

				scale.domain([0, len]);

			$words.each(function(i, el) {
				position = $.inArray(el.textContent, dataset);

				if( position >= 0 ) {
					console.log('yes');
					el.style.color = scale(position);
				}
				else {
					el.style.color = '#F02311';
				}
				//console.log(el.textContent);
			})
		}

		// var $original = $('p'),
		// 	scale = d3.scale.linear().range(['#222','#F02311']);

		// $original.each(function(i, el) {

		// 	//console.log(i, el.textContent);

		// 	var text = el.textContent,
		// 		$el = $(el),
		// 		sentenses = text.match( /[^\.!\?]+[\.!\?]+/g );

		// 		$el.text('');

		// 		sentenses.forEach(function (sentense, index) {

		// 			var letters = sentense.split('');

		// 			scale.domain([0,letters.length]);

		// 			letters.forEach(function (letter, index) {
		// 				//$el.append('<span style="color: ' + scale(index) + '; background-color: ' + scale(index) + '">' + letter + '</span>');
		// 				$el.append('<span style="color: ' + scale(index) + ';">' + letter + '</span>');
		// 			});

		// 			// for (var i = 0, len = sentense.length; i < len; i++) {
		// 			// 	//console.log(sentense[i]);
		// 			// 	$el.append('<span>' + sentense[i] + '</span>');
		// 			// }

		// 			//$el.append('<span><strong>' + sentense.length + '</strong>: ' + sentense + '</span>');

		// 			//$el.append('</p><p>');

		// 		});

		//})
		// words.forEach(function (word, index) {
  //           var html = words.slice(0, index),
		// 		currentPosition = 0;

  //           html.push('<span>' + word + '</span>');
  //           Array.prototype.push.apply(html, words.slice(index + 1, words.length));

		// 	copy.html(html.join(' '));

		// 	currentPosition = copy.find('span').position().top;

		// 	//console.log(copy.find('span').width(),copy.find('span').html());

		// 	if (currentPosition != position) {
		// 		lines.push([]);
		// 		position = currentPosition;
		// 		console.log(position, copy.find('span').html(), copy.find('span').position().top);

		// 	}

		// 	lines[lines.length - 1].push(word);
		// });

		// lines = lines.map(function (line) {
		// 	return line.join(' ');
		// });

		// console.log(lines)

		// $('#browser').parent().append(html.join(''));
	}

	browserTypeset();
});

$.fn.wordify = function(){
	textNodes = this.find(":not(iframe,textarea)").addBack().contents().filter(function() {
		return this.nodeType === 3;
	});
  
  /** jquery.wordify.js;
   ** https://gist.github.com/yukulele/8668962
   **/
	textNodes.each(function() {
		var $this = $(this);
		var text = $this.text();
		//console.log('in  :'+text);
		text = text.replace(/([^\s-.,;:!?()[\]{}<>"]+)/g,'<span class="word">$1</span>');
		//console.log('out :'+text);
		$this.replaceWith(text);
	});
	return this;
};