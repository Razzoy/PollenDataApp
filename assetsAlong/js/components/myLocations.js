export const myLocations = () => {
    const locations = JSON.parse(localStorage.getItem('pollLocations'));
    // console.log(locations);

    if (locations) {
        const select = document.createElement('select');

        for(let location of locations){
            const option = document.createElement('option');

            option.value = location.city;
            option.textContent = location.city;
            select.appendChild(option);
        }

        document.querySelector('header').appendChild(select)
        
    }
};