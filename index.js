document.addEventListener("DOMContentLoaded", () => {
    console.log("ready!")
    let kommune
    document.getElementById("btn-submit").addEventListener("click", event => {
        kommune = document.getElementById("kommune").value
        console.log(kommune)

        findKommune(kommune)
    })
})

async function findKommune(kommune) {
    let url = "https://api.kartverket.no/kommuneinfo/v1/sok"
    const data = await fetch(url + `?navn=${kommune}`).then(response => response.json()).then(data => {
        return data.kommuner[0];
    })
    const kommunenr = data.kommunenummer
    document.getElementById("result").innerHTML = "<p> blåser det i " + data.kommunenavn + "?</p>"
   getwind(data.punktIOmrade.coordinates[0], data.punktIOmrade.coordinates[1])
}

//todo add a header here
async function getwind(lat, long) {

    let url = "https://api.met.no/weatherapi/locationforecast/2.0/compact"
    const data = await fetch(url + `?lat=${lat}&lon=${long}`,).then(response =>
        response.json()
    ).then(data => {
        return data.properties.timeseries[0].data.instant.details.wind_speed
    })
}
