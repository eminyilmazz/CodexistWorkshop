var defaultLatLng = { lat:41.015137, lng: 28.979530}

var mapOptions = { 
    center: myLatLng, 
    zoom: 7,
    mapTypeId: google.maps.mapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);
eventListener();

function eventListener(){
    document.getElementById("location-values").addEventListener("submit", submitValues)

}

function submitValues(e){
    console.log("Başarılı")
}