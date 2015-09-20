jQuery(function ($) {
	function browserTypeset() {

		var p1 = new LatLon(52.5075419, 13.4251364);
		var coords, bearing, p2;

		$('span.coords').each(function(i, e) {

			coords = e.getAttribute('data-latlng').split(',');

			p2 = new LatLon(parseFloat(coords[0]), parseFloat(coords[1]));

			bearing = parseInt(p1.rhumbBearingTo(p2))
			console.log(i, e, bearing);

			$(e).append(' <img style="-webkit-transform: rotate(' + bearing + 'deg);" src="img/compass.svg" />')
		})

		// var p1 = new LatLon(51.127, 1.338), p2 = new LatLon(50.964, 1.853);
 	// 	var d = p1.rhumbBearingTo(p2); // d.toFixed(1): 116.7

 		//console.log(d)

	}

	browserTypeset();
});

function LatLon(lat, lon) {
    if (!(this instanceof LatLon)) return new LatLon(lat, lon);

    this.lat = Number(lat);
    this.lon = Number(lon);
}

LatLon.prototype.rhumbBearingTo = function(point) {
    var φ1 = this.lat.toRadians(), φ2 = point.lat.toRadians();
    var Δλ = (point.lon-this.lon).toRadians();
    
    if (Math.abs(Δλ) > Math.PI) Δλ = Δλ>0 ? -(2*Math.PI-Δλ) : (2*Math.PI+Δλ);

    var Δψ = Math.log(Math.tan(φ2/2+Math.PI/4)/Math.tan(φ1/2+Math.PI/4));

    var θ = Math.atan2(Δλ, Δψ);

    return (θ.toDegrees()+360) % 360;
};

if (Number.prototype.toDegrees === undefined) {
    Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}

if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}
