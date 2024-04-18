

getLocation()
const pollenTranslation = {
    "alder": "El",
    "birch": "Birk",
    "grass": "Græs",
    "mugwort": "Bynke",
    "olive": "Oliven",
    "ragweed": "Ambrosie"
}



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


    myNameElement.innerHTML = '<h1>' + myCity + '</h1>'

}


function getpollenData(lat, long) {

    const timeZone = 'Europe%2FBerlin';

    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1`

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

    const pollenTypes = ['alder_pollen', 'birch_pollen', 'grass_pollen', 'mugwort_pollen', 'olive_pollen', 'ragweed_pollen'];

    pollenTypes.forEach(pollenType => {
        // Hent det første ord før "_" og brug det med stort forbogstav
        let typeName = pollenType.split('_')[0];
        
        if (pollenTranslation.hasOwnProperty(typeName.toLowerCase())) {
            typeName = pollenTranslation[typeName.toLowerCase()];
        }

        // Opret et element til denne pollentype
        let pollenCard = document.createElement('div');
        pollenCard.classList.add('pollen-card');

        // Tilføj billedet til pollenkortet
        let pollenImage = document.createElement('img');
        pollenImage.src = `assets/img/${pollenType}.jpg`;
        pollenImage.alt = `${typeName} pollen`; // Alternativ tekst for billedet
        pollenCard.appendChild(pollenImage);

        // Tilføj overskrift til pollenkortet
        let heading = document.createElement('h3');
        heading.textContent = typeName;
        pollenCard.appendChild(heading);

        myDisplayElement.appendChild(pollenCard);

        // Opret et <p>-element for hver forekomst af denne pollentype i latestData
        latestData.forEach(element => {
            let pollenFigure = document.createElement('p');
            pollenFigure.textContent = `${element[pollenType]} p/m³`;
            pollenCard.appendChild(pollenFigure);
        });
    });


    // let myCurrentData = viewData[0]
    // hourData.forEach(element => {
    //     let pollenFigure = `<figure>${element}</figure>`;
    //     myDisplayElement.innerHTML += pollenFigure;

    //     });
}
