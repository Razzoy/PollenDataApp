

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


    getHumanReadableLocation(position.coords.latitude, position.coords.longitude);
    getpollenData(position.coords.latitude, position.coords.longitude);
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

    let myNameElement = document.getElementById('location');

    myNameElement.innerHTML = '<h1><span>City location: </span>' + myCity + '</h1>'

}


function getpollenData(lat, long) {

    const timeZone = 'Europe%2FBerlin';

    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1`

    console.log('get pollen data');
    console.log(lat, long);

    fetch(url)
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {

            pollenDataStructure(data)
            
        })
        .catch(error => {
            console.error('Fetch error:', error);
            return null;
        });
}

//Controller

function pollenDataStructure(data) {

    let myViewData = []

    //data omkring vores nuværende værdier
    myViewData.push(data.current)

    buildPollenView(myViewData)
}


//View

function buildPollenView(viewData) {

    // Byg html til nuværende view
    let myDisplayElement = document.getElementById('pollenData')

    console.log(viewData[0]);

    let myCurrentData = viewData[0] 

    let myCurrentHTML = 
    `<section>
        <h2>Pollental</h2>
        <ul>
            <li>El ${myCurrentData.alder_pollen}</li>
            <li>Birk ${myCurrentData.birch_pollen}</li>
            <li>Græs ${myCurrentData.grass_pollen}</li>
            <li>Bynke ${myCurrentData.mugwort_pollen}</li>
            <li>Oliven ${myCurrentData.olive_pollen}</li>
            <li>Ambrosie ${myCurrentData.ragweed_pollen}</li>
        </ul>
    </section>`

    myDisplayElement.innerHTML = myCurrentHTML
    
}

