
const locationApiUrl = 'http://api.geonames.org/searchJSON?q=';
const weatherApiUrl = 'https://api.weatherbit.io/v2.0/current?';
const imgApiUrl = 'https://pixabay.com/api/?key=';
const locationApiKey = 'alkarinqe';
const weatherApiKey = '33541f30f808419bb46a8caece1b44bd';
const imgApiKey = '16135920-02db654744351039ee1204e63';

const getData = async (url) => {
    //Obtain data from API
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ', error)
    }
}

const processData = (e) => {
    //Process data from APIs
    if(!Client.allClear()) {
        return;
    } else {
        e.preventDefault();
    }
    const location = document.getElementById('location').value;
    //Get location data from GeoNames
    getData(locationApiUrl + location + `&maxRows=5&username=${locationApiKey}`)
    .then((locData) => {
        let arr = [];
        ['lat', 'lng', 'countryName'].forEach((i) => {
            arr.push(locData.geonames[0][i]);
        });
        const country = arr[2];
        if(country === 'United States') {
            return getData(weatherApiUrl + `&lat=${arr[0]}&lon=${arr[1]}&units=I&key=${weatherApiKey}`);
        } else {
            //Get weather data from Weatherbit
            return getData(weatherApiUrl + `&lat=${arr[0]}&lon=${arr[1]}&key=${weatherApiKey}`);
        }
    })
    .then((weatherData) => {
        //Get time data from howSoon function
        const [tripStart, tripEnd, daysToDeparture, tripLength] = howSoon();
        const temp = weatherData['data'][0]['temp'];
        const icon = weatherData['data'][0]['weather']['icon'];
        const desc = weatherData['data'][0]['weather']['description'];
        const countryCode = weatherData['data'][0]['country_code'];
        //Send data to be stored in projectData object via POST
        return postData('/add', {location, countryCode, tripStart, tripEnd, daysToDeparture, tripLength, temp, icon, desc})
    })
    .then((updateData) => {
        updateUI(updateData);
        document.querySelector('form').reset();
    })
    .catch((error) => {
        console.log('Error: ', error);
    })
}

document.getElementById('go').addEventListener('click', processData);

const postData = async (url, dataObj={}) => {
    //Post function
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj)
      });

        try {
            const newData = await response.json();
            return newData;
        }catch(error) {
            console.log("error", error);
        }
};

const updateUI = async (updateData) => {
    //Update ui with obtained data
    let img = await getData(imgApiUrl + imgApiKey + `&q=${updateData.location}+city&category=travel&image_type=photo`);
    // if(img.total === 0) {
    //     img = await getData(imgApiUrl + imgApiKey + `&q=${updateData.location}+city&category=travel&image_type=photo`);
    // }
    const elements = document.querySelectorAll('.uiData');
    elements.forEach((e) => {
        let key = e.id;
        if(key === 'temp'){
            updateData.countryCode === 'US' ? e.innerHTML =  `${updateData[key]}&deg;F` : e.innerHTML = `${updateData[key]}&deg;C`;
        } else {
            e.innerHTML = updateData[key];
        }
    });
    document.getElementById('img').src = img.hits[0].webformatURL;
    document.getElementById('iconImg').src = `https://www.weatherbit.io/static/img/icons/${updateData['icon']}.png`;
    showDisplay();
};

const howSoon = () => {
    //Obtain departure date and calculate number of days to departure
    const now = new Date();
    let tripStart = document.getElementById('depart').value;
    let tripEnd = document.getElementById('return').value;
    const departureDate = new Date(tripStart);
    const returnDate = new Date(tripEnd);
    const daysToDeparture = parseInt((new Date(tripStart).getTime() - now.getTime()) / 86400000);
    const tripLength = parseInt((returnDate.getTime() - departureDate.getTime()) / 86400000);
    [tripStart, tripEnd].forEach((t) => {
        t.split('-').reverse().join('/');
    })
    return [tripStart, tripEnd, daysToDeparture, tripLength]
};

export {
    getData,
    processData,
    postData,
    updateUI
}




