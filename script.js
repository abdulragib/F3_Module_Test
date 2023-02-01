const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const TimeZoneName = document.getElementById("location");
const lat = document.getElementById("data-lat");
const long = document.getElementById("data-long");
const timezone = document.getElementById("timezone");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const windDirection = document.getElementById("wind-direction");
const uvIndex = document.getElementById("uv-index");
const feelsLike = document.getElementById("feels-like");
const output_box=document.getElementById('output-Box')

const apiKey = "b100f2366b0e4987a9b557d9144a226c";

// Get the user's current location using HTML5 Geolocation API
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);
      getTimeZone(latitude, longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

// Get the user's timezone using the latitude and longitude
function getTimeZone(latitude, longitude) {
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        updateUi(data);
    })
    .catch((error) => console.log(error));
}



// Update the UI with the user's timezone
 function updateUi(data) {
    TimeZoneName.innerHTML = `Name of TimeZone: ${data.results[0].timezone.name}`
    lat.innerHTML = `Lat: ${data.results[0].lat}`;
    long.innerHTML = `Long: ${data.results[0].lon}`;
    timezone.innerHTML = `OffSet STD: ${data.results[0].timezone.offset_STD}`;
    windSpeed.innerHTML = `OffSet STD Seconds: ${data.results[0].timezone.offset_STD_seconds}`;
    pressure.innerHTML = `OffSet DST: ${data.results[0].timezone.offset_DST}`;
    humidity.innerHTML = `OffSet DST Seconds: ${data.results[0].timezone.offset_DST_seconds}`;
    windDirection.innerHTML = `Country: ${data.results[0].country_code}`;
    uvIndex.innerHTML = `Postcode: ${data.results[0].postcode}`;
    feelsLike.innerHTML = `City: ${data.results[0].state_district
    }`;
  }

searchButton.addEventListener("click", () => {
    let address = searchInput.value;
    if(address == "")
    {
        console.log("hi")
        output_box.innerHTML = `Please enter an address`
        output_box.style.color='red'
    }
    else{
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateOutputUi(data);
        })
        .catch((error) => console.log(error));
    }
    
})

function updateOutputUi(data){
    
    output_box.innerHTML = `
    <h2>Your Result</h2>
    <div id="data-output-container">
    <div id="data">
      <div id="location">Name of TimeZone: ${data.features[0].properties.timezone.name}</div>
        <div id="lat-log-flex">
            <div id="data-lat">Lat: ${data.features[0].properties.lat}</div>
            <div id="data-long">Long: ${data.features[0].properties.lon}</div>
        </div>
        <div id="timezone">OffSet STD: ${data.features[0].properties.timezone.offset_STD}</div>
        <div id="wind-speed">OffSet STD Seconds: ${data.features[0].properties.timezone.offset_STD_seconds}</div>
        <div id="pressure">OffSet DST: ${data.features[0].properties.timezone.offset_DST}</div>
        <div id="humidity">OffSet DST Seconds: ${data.features[0].properties.timezone.offset_DST_seconds}</div>
        <div id="wind-direction">Country: ${data.features[0].properties.country_code}</div>
        <div id="uv-index">Postcode: ${data.features[3].properties.postcode}</div>
        <div id="feels-like">city: ${data.features[0].properties.state_district}
        </div>
      </div>
    </div>
    `
   
}
  
