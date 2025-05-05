document.addEventListener("DOMContentLoaded", () => {
    console.log("ready!")
    let kommune
    document.getElementById("btn-submit").addEventListener('click', event => {
        event.preventDefault()
        kommune = document.getElementById("kommune").value
        console.log(kommune)

        findKommune(kommune)
    })
})

async function findKommune(kommune) {
    let url = "https://api.kartverket.no/kommuneinfo/v1/sok"
    const data = await fetch(url + `?knavn=${kommune}`,{ method : 'GET'}, 

    ).then(response => response.json()).then(data => {
        return data.kommuner[0];
    })
    const kommunenr = data.kommunenummer
   
 
   const wind = await getwind(data.punktIOmrade.coordinates[0], data.punktIOmrade.coordinates[1])
   console.log(wind)
    let ut = `<p> blåser det i  ${data.kommunenavn}?</p><p>m/s: ${wind}</p><p>${windy(wind)}</p>`
   document.getElementById("result").innerHTML = ut
}

async function getwind(lat, long) {

    let url = "https://api.met.no/weatherapi/locationforecast/2.0/compact"
    const data = await fetch(url + `?lat=${lat}&lon=${long}`,).then(response =>
        response.json()
    ).then(data => {
        return data.properties.timeseries[0].data.instant.details.wind_speed
    })
    return data
}
function windy(wind){
    if(wind == 0.00 ) return "det blæs ittj"
    if (wind >= 1.00 && wind < 6.00) return "det blæs litt"
    if (wind  <= 6.00 && wind > 10.00) return "det blæs"
    if (wind >= 10.00) return "det blæs veldig mye"
}
