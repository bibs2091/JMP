function initMap() {
  var markers = [];


  if (document.title == "add event") {
    // map options
    var options = {
      zoom: 15,
      center: { lat: 35.20822045997799, lng: -0.6333231925964355 }
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);
    var marker = new google.maps.Marker({
      position: { lat: 35.20822045997799, lng: -0.6333231925964355 },
      map: map
    });
    //document.getElementById("location").value = marker.getPosition().lat() + "||" + marker.getPosition().lng();
  }
  else {
    var lat = parseFloat(document.getElementById("location").attributes.lat.nodeValue);
    var lng = parseFloat(document.getElementById("location").attributes.lng.nodeValue);
    // map options
    var options = {
      zoom: 15,
      center: { lat, lng }
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);
    //getting a marker for the locaation of the event 
    var marker = new google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  }
  // Listen for click on map
  if (document.title != "event page") {

    google.maps.event.addListener(map, 'click', function (event) {
      // move marker
      moveMarker({ coords: event.latLng }, map, markers);
    });
  }
  markers.push(marker);


}
// move Marker Function
function moveMarker(props, map, markers) {

  var marker = new google.maps.Marker({
    position: props.coords,
    map: map
  });
  markers[0].setMap(null);

  markers[0] = marker;
  document.getElementById("location").value = marker.getPosition().lat() + "||" + marker.getPosition().lng();
}