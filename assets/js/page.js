

getLocation()



function getLocation(){
    if(navigator.geolocation) {

        //navigator.geolocation.getCurrentPosition kræver en navngivet success-funktion som første parameter og en navngivet fejl-funktion som sekundær parameter.

        navigator.geolocation.getCurrentPosition(showPosition, geoError);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

//Geo Location success funktioner modtager et data objekt
function showPosition(position) {
   console.log('Longitude: ' + position.coords.longitude);
   console.log('Latitude: ' + position.coords.latitude);
}


//Geo error funktion som modtager et data objekt
function geoError(error) {

    console.log(error.message);
}