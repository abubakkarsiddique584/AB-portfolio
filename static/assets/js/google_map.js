var google;

function init() {
    // Define your latitude and longitude
    var myLatlng = new google.maps.LatLng(34.779518, 72.352409);

    var mapOptions = {
        // Zoom level (adjust as needed)
        zoom: 10, // Change this value to zoom in/out

        // Center the map on your location
        center: myLatlng,

        // Map styles
        scrollwheel: false,
        styles: [
            {"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},
            {"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},
            {"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},
            {"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},
            {"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},
            {"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},
            {"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},
            {"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},
            {"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},
            {"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},
            {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
            {"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}
        ]
    };

    // Get the HTML DOM element that will contain your map
    var mapElement = document.getElementById('map');

    // Create the Google Map using the element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    var addresses = ['Your Location']; // You can change this to whatever you want

    // Use geocoding to place a marker for the specified address
    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', null, function (data) {
            if (data.results.length > 0) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'static/images/loc.png' // Ensure this path is correct
                });
            }
        });
    }

    // Optionally, add a marker directly for your specific location
    new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Your Location",
        icon: 'static/images/loc.png' // Ensure this path is correct
    });
}

// Initialize the map on window load
google.maps.event.addDomListener(window, 'load', init);

