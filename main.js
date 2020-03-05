let appId = 'f91c342855202675de5f13d23f2a977c';
let units = 'metric';
let h2 = document.getElementById('h2');
let h3 = document.getElementById('h3');
let dropList = document.getElementById('dropList');
let displayResults =document.getElementById('displayResults');
let displayDate = document.getElementById('displayDate');
let coordsPage = document.getElementById('coords-page');
let chooseValue = document.getElementById('choose-value');
let cityIdZip = document.getElementById('cityIdZip');

console.log(dropList.value)
let searchMethod;
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q'
}

document.getElementById('city-idResultsBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);

    cityIdZip.classList.add('hide-show');
    h2.classList.add('hide-show');
    h3.classList.remove('hide-show');
    h3.innerHTML = 'Here are your result took by: ' + dropList.value;
    displayResults.classList.remove('hide-show');
    displayDate.innerHTML = 'On date: ' + dateInput.value;
});
//dropdown options and date format
function dropDwnList() {
    displayText = dropList.options[dropList.selectedIndex].text;
}
const dateInput = document.getElementById('dateInput');
dateInput.valueAsNumber = Date.now() - (new Date()).getTimezoneOffset() * 60000;

//hide-show pages
document.getElementById('next-step').addEventListener('click', () => {
    if (dropList.value === 'Coordinates') {
        chooseValue.classList.add('hide-show');
        coordsPage.classList.remove('hide-show');
    } else {
        chooseValue.classList.add('hide-show');
        cityIdZip.classList.remove('hide-show');
    }
});

//API calls
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

//displaying results
function init(resultFromServer) {
    let status = document.getElementById('responseStatus');
    if (resultFromServer.cod === 200) {
        status.innerHTML = 'Request processed with succes !!';
    } else if (resultFromServer.cod !== 200) {
        status.style.color = '#f92b2b';
        status.textContent = 'Failed to process this request' + ' - ' + resultFromServer.message + '!!';
    }
    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('img/clear.jpg')";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url('img/cloudy.jpg')";
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = "url('img/rain.jpg')";
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('img/storm.jpg')";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url('img/snow.jpg')";
            break;
        default:
            document.body.style.backgroundImage = "url('img/default.jpg')";
            break;
    }

    let cityNameHeader = document.getElementById('cityNameHeader');
    let windSpeed = document.getElementById('windSpeed');
    let currentConditionIcon = document.getElementById('currentConditionIcon');
    let currentConditionDescription = document.getElementById('currentConditionDescription');
    let temperature = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');

    let newIcon = document.createElement('img')
    currentConditionIcon.appendChild(newIcon);

    newIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    let resultDescription = resultFromServer.weather[0].description;
    currentConditionDescription.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeed.innerHTML = Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityNameHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = resultFromServer.main.humidity + '%';
}

//getting coords from imput
document.getElementById('coordsResultBtn').addEventListener('click', () => {
    let latInput = document.getElementById('latitude').value;
    let longInput = document.getElementById('longitude').value;
    searchByCoords(latInput, longInput);

    h2.classList.add('hide-show');
    h3.classList.remove('hide-show');
    h3.innerHTML = 'Here are your result took by: ' + dropList.value;
    coordsPage.classList.add('hide-show');
    displayResults.classList.remove('hide-show');
    displayDate.innerHTML = 'On date: ' + dateInput.value;
})
//API call with coodinates 
function searchByCoords(latInput, longInput) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${longInput}&lon=${latInput}&appid=${appId}`).then(response => {
        return response.json();
    }).then(response => {
        init(response);
    });
};





