var scale = d3.scale.linear().range([100,300]).domain([0,10]);

$('.smile').hover(function() {
	var $this = $(this);
	var value = scale($this.data('value'));

	d3.select('path').transition().attr("d", 'M1,200 C50,' + value + ' 250,' + value + ' 300,200');

})