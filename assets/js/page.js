

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
            console.log(data);

        })
        .catch(error => {
            console.error('Fetch error:', error);
            return null;
        });
}


//Temporary View code
function buildLocationName(myCity) {

    let myNameElement = document.getElementById('location');


    myNameElement.innerHTML = '<h1><span>Lokation: </span>' + myCity + '</h1>'

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

            receivedPollenData(data);
            

        })
        .catch(error => {
            console.error('Fetch error:', error);
            return null;
        });
}

//Controller

function receivedPollenData(data) {

    let hourData = [];

    let timeStamps = data.hourly.time;

    timeStamps.map((timestamp, index) => {

        let hourDataObjects = {}

        hourDataObjects.time = timestamp;
        hourDataObjects.alder_pollen = data.hourly.alder_pollen[index];
        hourDataObjects.birch_pollen = data.hourly.birch_pollen[index];
        hourDataObjects.grass_pollen = data.hourly.grass_pollen[index];
        hourDataObjects.mugwort_pollen = data.hourly.mugwort_pollen[index];
        hourDataObjects.olive_pollen = data.hourly.olive_pollen[index];
        hourDataObjects.ragweed_pollen = data.hourly.ragweed_pollen[index];

        hourData.push(hourDataObjects);


    });

    let latestPollenData = [];
    latestPollenData.push(hourData[0]);
    console.log(latestPollenData);

    
    buildPollenView(hourData, latestPollenData);
}


// VIEW

//Bygger en pollen data view med nuværende data og en timevist 24 time data, som er modtage i en array
function buildPollenView(hourData, latestData) {

    // Byg html til nuværende view
    let myDisplayElement = document.getElementById('pollenData')


    // let myCurrentData = viewData[0]

    latestData.forEach(element => {
    let pollenFigure = `<figure>${element.alder_pollen}</figure>`;
    myDisplayElement.innerHTML += pollenFigure;
        
    });

    hourData.forEach(element => {
        let pollenFigure = `<figure>${element}</figure>`;
        myDisplayElement.innerHTML += pollenFigure;
            
        });

//     let myCurrentHTML =
//         `<ul>
//      <li>
//          <h2>El<h2>
//          <img src="assets/img/alder_pollen.jpg" alt="El Pollen">
//          <span>${myCurrentData.alder_pollen} p/m³</span>
//      </li>
//      <li>
//          <h2>Birk<h2>
//          <img src="assets/img/birch_pollen.jpg" alt="Birk Pollen">
//          <span>${myCurrentData.birch_pollen} p/m³</span>
//      </li>
//      <li>
//          <h2>Græs<h2>
//          <img src="assets/img/grass_pollen.jpg" alt="Græs Pollen">
//          <span>${myCurrentData.grass_pollen} p/m³</span>
//      </li>
//      <li>
//          <h2>Bynke<h2>
//          <img src="assets/img/mugwort_pollen.jpg" alt="Bynke Pollen">
//          <span>${myCurrentData.mugwort_pollen} p/m³</span>
//      </li>
//      <li>
//          <h2>Oliven<h2>
//          <img src="assets/img/olive_pollen.jpg" alt="Oliven Pollen">
//          <span>${myCurrentData.olive_pollen} p/m³</span>
//      </li>
//      <li>
//          <h2>Ambrosie<h2>
//          <img src="assets/img/ragweed_pollen.jpg" alt="Ambrosie Pollen">
//          <span>${myCurrentData.ragweed_pollen} p/m³</span>
//      </li>
//  </ul>
// `;

//     myDisplayElement.innerHTML = myCurrentHTML

}
