export const myFetch = async endpoint => {
    try {
        const response = await fetch(endpoint)
        if(response.ok){
            return await response.json()
        }
    } catch (error) {
        console.error(`Fejl i fetch funktion: ${error}`)
    }
}