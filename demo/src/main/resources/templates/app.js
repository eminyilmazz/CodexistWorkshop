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
    //HTTP GET Request
    get(url, callback){
        this.xhr.open('GET',url)
        this.xhr.setRequestHeader('Content-type', 'application/json');
        // this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        this.xhr.onload = function() {
            if (this.xhr.status === 200){
                callback(null, this.xhr.responseText);
            }
            else {
                callback("Error: " + this.xhr.status, null)
            }
        }.bind(this);
        this.xhr.send();
    }
    //HTTP POST Request
    post(url, data, callback) {
        this.xhr.open('POST', url)
        this.xhr.setRequestHeader("Content-Type", "application/json");
        this.xhr.onload = function() {
//          console.log(this.xhr.status) 
            if (this.xhr.status === 200) {
//          console.log("Code 200");
            callback(null, this.xhr.responseText);
            }
            else {
                callback("Error: " + this.xhr.status, null)
            }
        }.bind(this);
        this.xhr.send(JSON.stringify(data));
    }
}
const baseUrl = "http://localhost:8080/";
const req = new Request();

document.getElementById("location-values").addEventListener("submit", onSubmit)

function onSubmit(e){
    console.log("onSubmit")
    let long = document.getElementById("longitude").value
    let lat = document.getElementById("latitude").value
    getRequestUrl = baseUrl + "coordinates?" + "longitude=" + long + "&" + "latitude=" + lat;
    console.log(getRequestUrl);
    req.get(getRequestUrl, updateBox);

    e.preventDefault();
}
function updateBox(err, response){
//  console.log("updateBox")
    if (response) {
        document.getElementById("message-space").innerHTML = "The coordinates of the given location already exists in the database.<br>Fetching data...";
    }
    else {
        document.getElementById("message-space").innerHTML = "The coordinates of the given location doesn't exist in the database.<br>Posting data...";
        let long = document.getElementById("longitude").value
        let lat = document.getElementById("latitude").value
        let coordinates = {longitude: long, latitude: lat};
        const postRequestUrl = baseUrl + "locations"
        req.post(postRequestUrl, coordinates, function(err, response){
            console.log(response)
            if (response) {
                document.getElementById("message-space").innerHTML += "<br>Posting completed." 
            } else {
                document.getElementById("message-space").innerHTML += " Error posting coordinates."
            }
        })
    }
    if (err === null) {
        console.log(typeof JSON.stringify(response))
//      document.getElementById("message-space").textContent = JSON.stringify(response);


    }
    else {console.log(err);}
}
