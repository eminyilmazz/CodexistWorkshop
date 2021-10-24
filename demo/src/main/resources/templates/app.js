// var defaultLatLng = { lat:41.015137, lng: 28.979530}

// var mapOptions = { 
//     center: myLatLng, 
//     zoom: 7,
//     mapTypeId: google.maps.mapTypeId.ROADMAP
// };

// var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);


class Request {
    constructor(){
        this.xhr = new XMLHttpRequest();
    }
    get(url, callback){
        this.xhr.open("GET",url)
        this.xhr.setRequestHeader('Content-type', 'application/json');
        // this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        console.log("here get")
        this.xhr.onload = function() {
            if (this.xhr.status === 200){
                console.log("in if")
                callback(null, this.xhr.responseText);
            }
            else {
                callback("Error: " + this.xhr.status, null)
            }
        }.bind(this);
        this.xhr.send();
    }

}

document.getElementById("location-values").addEventListener("submit", onSubmit)
const req = new Request();
function onSubmit(e){
    console.log("onSubmit")
    req.get("http://localhost:8080/locations", updateBox)

    e.preventDefault();
}
function updateBox(err, response){
    console.log("updateBox")
    if (err === null) {
        console.log("Response " + response)
    }
    else {console.log(err);}
    // document.getElementById("google-map-box").textContent = response.responseText;
}
