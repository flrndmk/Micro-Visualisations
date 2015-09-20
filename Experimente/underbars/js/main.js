var color = d3.scale.category10();

$(function(){
   $(window).load(function(){
      $('.word').each(function() {
			//console.log($(this).position(), $(this).offset());
			var y = $(this).offset().top;
			var x = $(this).offset().left;
			var width = $(this).width();
			var height = $(this).height();
			var data = $(this).data('item').split(',');
			var sum = data.reduce(function(pv, cv) { return pv + parseInt(cv); }, 0);
			var id = 'el' + parseInt(x) + parseInt(y);

			var svg = d3.select("body").append("svg").attr("width", 50).attr("height", 50).attr("id", id).attr('style', 'position: absolute; top: '+ (y+height) +'px; left: ' + x + 'px;')

			// jQuery('<svg/>', {
			//     id: id
			// })
			// .attr('height', 400)
			// .attr('width', 400)
			// .appendTo('.container');

			var scale = d3.scale.linear().domain([0,sum]).range([0,width]);

			console.log('scale:' + scale(sum), width)

			console.log(x,y,width,height,data, sum);

			//var svg = d3.select('svg#' + id);
			//console.log(svg)

			// data.forEach(function(e) {
			// 	console.log(e);
			// });

			var circle = svg.selectAll("rect")
			    .data(data, function(d) { 
			    	console.log('values here:', scale(parseInt(d)));
			    	return scale(parseInt(d)); });

			var current = 0;

			circle.enter().append("rect")
                             .attr("x", function(d) {
                           	current = current + scale(parseInt(d)); return current - scale(parseInt(d));
                           })
                           .attr("y", 0)
                           .attr("width", function(d) {
                           	return  scale(parseInt(d))
                           })
                          .attr("height", 3)
                          .attr('fill', function(d,i) {
                          	return color(i);
                          });


			
		});
   });
});