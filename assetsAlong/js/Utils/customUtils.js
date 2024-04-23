import { myFetch } from "./apiUtils.js"

export const getFriendlyPollNames = name => {
    const friendlyNames = {
        "alder_pollen": "El",
        "birch_pollen": "Birk",
        "grass_pollen": "Græs",
        "mugwort_pollen": "Bynke",
        "olive_pollen": "Oliven",
        "ragweed_pollen": "Ambrosie"
    }

    return friendlyNames[name]
}

export const getPollImage = name => {
    const pollImages = {
        "alder_pollen": "alder.jpg",
        "birch_pollen": "birch.jpg",
        "grass_pollen": "grass.jpg",
        "mugwort_pollen": "mugwort.jpg",
        "olive_pollen": "olive.jpg",
        "ragweed_pollen": "ragweed.jpg"
    }

    return pollImages[name]
}

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async position => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                const streetMapData = await getCityFromCoords(location.latitude, location.longitude);
                location.city = streetMapData.address.city;
                resolve(location)
            },
            error => {
                console.error(error)
                reject(error)
            }
        )

        } else {
            console.error('Geolocation nt available');
        }
    })

}

export const getCityFromCoords = async(latitude, longitude) => {
    return await myFetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
}