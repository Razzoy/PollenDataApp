export const getFriendlyPollNames = name =>{
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

export const getPollImage = name =>{
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