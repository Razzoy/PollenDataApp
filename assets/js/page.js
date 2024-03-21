

getLocation()



function getLocation(){
    if(navigator.geolocation) {

        //navigator.geolocation.getCurrentPosition Kræver en navngivet success-funktion som første parameter og en navngivet fejl-funktion som en sekundær parameter.

        navigator.geolocation.getCurrentPosition(showPosition, geoError);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
   console.log('Longitude: ' + position.coords.longitude);
   console.log('Latitude: ' + position.coords.latitude);
}

function geoError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('User denied  the request for Geolocation.');
            break;
        
        case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;
        
        case error.TIMEOUT:
            console.log('The Request to get user location timed out.');
            break;
        
         case error.UNKNOWN_ERROR:
            console.log('An unknown error occured.');
            break;
    }
}