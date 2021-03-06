$(document).ready(function() {
  // Init
  $.get('home.html', function(data) {
    $('.container').html(data);
  });

  // Links
  $('#home').on('click', function() {
    $.get('home.html', function(data) {
      $('.container').html(data);
    });
  });

  $('#about').on('click', function() {
    $.get('about.html', function(data) {
      $('.container').html(data);
    });
  });

  // Events that need to be listened upon change
  $('.container').on('click', '.animate', function() {
    $('img').animate({
      left: "+=500"
    }, 2000, function() {
      $(this).animate({
        opacity: 0,
        bottom: "+=500"
      }, 2000, function() {
        $('h1').text('Complete');
      });
    });
  });
});
function initialize() {
  // Create a map to show the results, and an info window to
  // pop up if the user clicks on the place marker.
  var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
    scrollwheel: false
  });
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  document.getElementById('submit').addEventListener('click', function() {
    placeDetailsByPlaceId(service, map, infowindow);
  });
}

function placeDetailsByPlaceId(service, map, infowindow) {
  // Create and send the request to obtain details for a specific place,
  // using its Place ID.
  var request = {
    placeId: document.getElementById('place-id').value
  };

  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // If the request succeeds, draw the place location on the map
      // as a marker, and register an event to handle a click on the marker.
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });

      map.panTo(place.geometry.location);
    }
  });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);
