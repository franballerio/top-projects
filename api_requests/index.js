"use strict"

// function apiCall(url) {
//     let response = fetch(url)
//         .then(function(response) {
//             console.log(response.json());
//             return response;
//         })
//         .catch(function(error) {
//             console.error('Error:', error);
//         })
// }

async function apiCall(url) {
    try {
        let response = await fetch(url);

        console.log(response.json());
        return response
    }
    catch (error) {
        console.log(error)
    }
}

function getWeather(city) {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=days&key=QX9HUH4BFDVYSUUH3GGP8JYE5&contentType=json`
    return apiCall(url)
}

