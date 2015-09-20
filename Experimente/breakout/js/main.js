var color = d3.scale.category10();

$(function(){
   $(window).load(function(){
      $('.word').each(function() {
			//console.log($(this).position(), $(this).offset());
			var y = $(this).offset().top;
			var x = $(this).offset().left;
			var width = $(this).width();
			var height = $(this).height();
			var data = [$(this).data('item')];
			var id = 'el' + parseInt(x) + parseInt(y);



			var max = 200;

			var middle = { x : (x + width/2 - max/2), y : (y + height/2 - max/2) };

			console.log(x,y,width,height, middle);

			var svg = d3.select("body").append("svg").attr("width", max).attr("height", max).attr("id", id).attr('style', 'position: absolute; top: '+ middle.y +'px; left: ' + middle.x + 'px;')

			var scale = d3.scale.linear().domain([0,20]).range([0,max/2]);


			var circle = svg.selectAll("circle")
			    .data(data, function(d) { 
			    	return parseInt(d);
			    });

			var current = 0;

			circle.enter().append("circle")
			    .attr("cy", max/2)
			    .attr('fill', '#efea4b')
			    .attr("cx", max/2)
			    .attr("r", function(d) { return scale(d); });

			var line = svg.selectAll("line")
			    .data(data, function(d) { 
			    	return parseInt(d);
			    });

			line.enter().append("line")
				.attr("x1", max/2)
				.attr("y1", max/2)
				.attr("x2", function(d) {
					return max/2;
				})
				.attr("y2", function(d) {
					return max/2 + scale(d);
				});



			
		});
   });
});