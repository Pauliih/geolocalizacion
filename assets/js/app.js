function initMap(){
  var map = new google.maps.Map(document.getElementById("map"),{
    zoom: 5, 
    center: {lat: -9.1191427, lng: -77.0349046},
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  var image = {
    url : 'http://icons.iconarchive.com/icons/sonya/swarm/128/Bike-icon.png',
    size : new google.maps.Size(71, 71),
    origin : new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(35, 35)
  }

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(functionExito, functionError);
    }
  }

  document.getElementById("buscar").addEventListener("click", buscar);
  var latitud, longitud;

  var functionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position : {lat: latitud, lng: longitud},
      animation: google.maps.Animation.DROP,
      draggable: true, 
      title: "Drag me!",
      map: map,
      icon: image
    });

    map.setZoom(17);
    map.setCenter({lat: latitud, lng: longitud});
  }

  var functionError = function(error){
    alert("No encontré tu ubicacion");
  }

  // autocompletado
  var origen = document.getElementById('origen');
  var autocomplete = new google.maps.places.Autocomplete(origen);
  autocomplete.bindTo('bounds', map);

  var destino = document.getElementById('destino');
  var autocomplete = new google.maps.places.Autocomplete(destino);
  autocomplete.bindTo('bounds', map);

  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();

  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsDisplay, directionsService);
  };

  document.getElementById('ruta').addEventListener('click', onChangeHandler);

  function calculateAndDisplayRoute(directionsDisplay, directionsService) {
    directionsService.route({
      origin: document.getElementById('origen').value,
      destination: document.getElementById('destino').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }
        else {
          window.alert('Directions request failed due to' + status)
        }
    });
  }
}