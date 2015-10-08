
//a*(x+d)^b+c=y



(function() {

	var Point = {
		x : 0,
		y : 0,
		t : function() {
			return this.x + ' ' + this.y;
		}
	}

	var s = Snap('#canvas'),

		a = 1,
		b = 0,
		c = 0,
		p = q = q1 = q2 = r = Point,
		w = parseFloat(s.attr('width')),
		h = parseFloat(s.attr('height')),
		hw = w / 2 / 10,
		hh = h / 2 / 10,
		matrix = new Snap.Matrix(),
		g = s.g(),
		axisAttr = { stroke: '#aaa', fill: 'none', 'stroke-width': .05 }
		points = [];

		matrix.translate( w/2+0.5, h/2+0.5 );
		matrix.scale(10, 10, 0, 0);
		g.transform(matrix);

	Number.prototype.getY = function() {
		return -(a * Math.pow((this + b), 2) + c) / 4;
	};

	Number.prototype.getYD = function() {
		return b * this;
	};

	

	function interactiveGraph () {
		interactiveGraph.calcValues();
   		interactiveGraph.drawGraph();
	}

   	interactiveGraph.calcValues = function() {
	   	p.x = hw * -1 + c;
	   	
	   	console.log( 100 );
	   	p.y = p.x.getY();
	   	console.log('p', p.x, p.y);

	   	r.x = hw + c;
	   	r.y = r.x.getY();

	   	q.x = 0;
	   	q.y = 0;

	   	interactiveGraph.printPoints();
   	};

   	interactiveGraph.drawGraph = function() {
   		
   		g.add(s.line( -hw, 0, hh, 0 ).attr( axisAttr ));

   		g.add(s.line( 0, -hw, 0, hh ).attr( axisAttr ));

   		for (var i = -hw; i < hw; i = i + 0.2) {
   			var x = i,
   				y = i.getY();

   			points.push({ x : i, point : s.circle(x, y, 0.1) } );
   			g.add(points[points.length-1].point);
   			console.log(points[points.length-1].point.attr('cx'), x);
   			
   		};

   	};

   	interactiveGraph.render = function() {
   		//console.log(points);

   		function logArrayElements(element, index, array) {
   		    //console.log("a[" + index + "] = " + element);
   		    var x = parseFloat(element.point.attr('cx')),
   		    	y = x.getY();
   		    	//console.log(element.point.attr('dx'), y);
   		    	//console.log(x,y,element.point.attr('cx'), element.point.attr('cy'));
   		    element.point.attr({ cx: x, cy : y})	
   		    //element.point.animate({ cx: x, cy : y})
   		}

   		points.forEach(logArrayElements);

   	};

   	interactiveGraph.printPoints = function() {
   		console.log('a', a, 'b', b, 'c', c);
   		console.log('hw', hw, 'hh', hh);
   		console.log('p', p.x, p.y);
   		console.log('q', q.x, q.y);
   		console.log('r', r.x, r.y);
   		console.log('q1', q1.x, q1.y);
   		console.log('q2', q2.x, q2.y);
   	};

   	interactiveGraph.calcGraph = function() {

   		var pathString = 'M' + p.t + ' C ' + q1.t + ', ' + q.t + ', ' + q2.t + ', ' + r;
   		
   		g.add(s.line( -hw, 0, hh, 0 ).attr( axisAttr ));

   		g.add(s.line( 0, -hw, 0, hh ).attr( axisAttr ));

   		g.add(s.circle(p.x, p.y, 0.2));
   		g.add(s.circle(q.x, q.y, 0.2));
   		g.add(s.circle(r.x, r.y, 0.2));
   		g.add(s.circle(q1.x, q1.y, 0.2));
   		g.add(s.circle(q2.x, q2.y, 0.2));

   		// s.circle(0, 0, 2);
   		// s.circle(200, 0, 2);
   		// s.circle(0, 200, 2);
   		// s.circle(200, 200, 2);

   		//var circle = s.circle(0, 0, 2);

   		//g.add(circle);

   	};

   	$varA = $('#varA');
   	$varB = $('#varB');
   	$varC = $('#varC');

   	$hover = $('#hover');

   	$varCLink = $('#varCLink');

   	$varCLink.hover(function() {
   		console.log($(this).width());

   		$hover.css( { top: $(this).offset().top, left: $(this).offset().left, width: $(this).width() } );
   		
   		//$hover.html($(this).data('hover'));
   		//$hover.html('Variable C<br /><input type="range" id="parC" min="-1000" max="1000" style="width: ' + $(this).width() + 'px" />');

   		$hover.find('input').css({width: $(this).width() + 'px'});

   		console.log($(this).data('var'));

   		$hover.fadeIn();

   		$hover.hover(function() {
   			$('.varC').addClass('active');
   		},
   		function() {
   			$hover.fadeOut();
   			$('.varC').removeClass('active');
   		});

   	}, function() {

   	   //$hover.fadeOut();

   	});

   	$('#parA').change(function() {
   		a = $(this).val() / 100;
   		$varA.html(a.toFixed(2));
   		interactiveGraph.render();
   	});

   	$('#parB').change(function() {
   		b = $(this).val() / 100;
   		$varB.html(b.toFixed(2));
   		interactiveGraph.render();
   	});

   	$('#parC').change(function() {
   		c = $(this).val() / 50;
   		$varC.html(c.toFixed(2));
   		interactiveGraph.render();
   	});

   	interactiveGraph();

})();

$('.hover').hover(function() {
	$('.' + $(this).data('hover')).addClass('active');
}, function() {
	$('.' + $(this).data('hover')).removeClass('active');
});


/*
console.log(p.x, p.y);


var data = [20,40,10,70,30,50,20,50,10];

var pathString = '';

var bezierLength = 50;
var punkteAbstand = 100;

for (var i = 0; i < data.length; i++) {
	console.log(data[i],i);
	
	if(i == 0) {
		pathString = 'M00 ' + data[i] + ' ';
	}
	else {
		pathString += ' C ' + (((i-1) * punkteAbstand) + bezierLength) + ' ' + data[i-1] + ', ' + (i * punkteAbstand - bezierLength) + ' ' + data[i] + ', ' + (i * punkteAbstand) + ' ' + data[i] + ' ';
	}
	s.path('M ' + i * punkteAbstand + ' 0 L ' + i * punkteAbstand + ' 90').attr( { stroke: '#aaa', fill: 'none', 'stroke-width': .1, 'fill-opacity': 1 } );

	for (var n = 0; n < 5; n++) {
		s.text( i * punkteAbstand, n*10, n).attr( {
	    	'font-size': '0.6em'
		} );	
	};
	
};

console.log(pathString);

//var pathString = 'M00 100 C 20 100, 80 20, 100 20 C 120 20, 180 20, 200 100';

var upper_left_panel = s.path(Snap.parsePathString(pathString));

upper_left_panel.hover(function() {
	this.attr( { stroke:'#0f0' } );
}, function() {
	this.attr( { stroke:'#000' } );
})

upper_left_panel.attr({stroke:'#000',fill:'none','stroke-width':1.5,'fill-opacity':1,'stroke-linecap':"round"});*/