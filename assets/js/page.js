

getLocation()



function getLocation() {

    if (navigator.geolocation) {

        //navigator.geolocation.getCurrentPosition kræver en navngivet success-funktion som første parameter og en navngivet fejl-funktion som sekundær parameter.

        navigator.geolocation.getCurrentPosition(showPosition, geoError);

    } else {
        alert('Geolocation is not supported by this browser.')
    }
}

//Geo Location success funktioner modtager et data objekt
function showPosition(position) {

    console.log('Longitude: ' + position.coords.longitude);
    console.log('Latitude: ' + position.coords.latitude);

    //Get location navn
    getHumanReadableLocation(position.coords.latitude, position.coords.longitude)

    //Get pollen data navn
    getpollenData(position.coords.latitude, position.coords.longitude)
}

//Geo error funktion som modtager et data objekt
function geoError(error) {

    console.log(error.message);
}



function getHumanReadableLocation(lat, long) {

    const apiKey = '65fbef12a2103000499635lbjd9f457';
    const myUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;

    fetch(myUrl)
        .then(response => {

            console.log(response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {

            buildLocationName(data.address.city);
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
            return null;
        });
}


//Temporary View code
function buildLocationName(myCity) {

    let myNameElement = document.getElementById('app');

    myNameElement.innerText = myCity

}


function getpollenData(lat, long) {

    const apiKey = '65fbef12a2103000499635lbjd9f457';
    const myUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;

    console.log('get pollen data');
    console.log(lat, long);

    // fetch(myUrl)
    //     .then(response => {

    //         console.log(response);

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         return response.json();
    //     })
    //     .then(data => {

    //         buildLocationName(data.address.city);
            
    //     })
    //     .catch(error => {
    //         console.error('Fetch error:', error);
    //         return null;
    //     });
}



