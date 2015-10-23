$('#tracker').click(function(){

  navigator.geolocation.getCurrentPosition(youfoundme, function(){}, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
});

function youfoundme(pos){
  $('#latitude').text(pos.coords.latitude);
  $('#longitude').text(pos.coords.longitude);

  $.ajax({
    url: '/locations',
    method: 'post',
    data: {latitude: pos.coords.latitude, longitude: pos.coords.longitude},
    success: function(response){
      map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
      map.setZoom(17);
      var m = new google.maps.Marker({map:map, position: {lat: pos.coords.latitude, lng: pos.coords.longitude}});
    }
  });
}

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7875, lng: -122.3973},
    zoom: 8
  });
}

function getPositions(){
  $.ajax({
    url: '/locations',
    method: 'get',
    success: function(response){
      for(var i = 0; i < response.length; i++){
        var m = new google.maps.Marker({map:map, position: {lat: response[i].latitude, lng: response[i].longitude}});
      }
    }
  });
}

initMap();
getPositions();
