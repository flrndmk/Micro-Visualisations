$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})



var svg = d3.select("svg");

svg.selectAll("circle")
		.data([{ 'value': 032, 'title': 'No 1'}, { 'value': 057, 'title': 'No 2'}, { 'value': 112, 'title': 'No 3'}, { 'value': 293, 'title': 'No 4'}])
	.enter().append("circle")
		.attr("cy", 60)
		.attr("cx", function(d, i) { return i * 70 + 10; })
		.attr("r", function(d) { return Math.sqrt(d.value); })
		.attr("title", function(d) {
			return '<strong>Title:</strong> ' + d.title + '<br />…';
		})

$('circle')
	.tooltip({
		'container': 'body',
		'placement': 'top',
		'html' : true
	});