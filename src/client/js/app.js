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
        console.log('Error: ', error);
        showError(error);
    }
};

const processData = (e) => {
    //Process data from APIs
    if(!Client.allClear()) {
        return;
    } else {
        e.preventDefault();
    }
    //Capitalize city name
    let location = document.getElementById('location').value;
    location = location.charAt(0).toUpperCase() + location.slice(1)
    //Get location data from GeoNames
    getData(locationApiUrl + location + `&maxRows=5&username=${locationApiKey}`)
    .then((locData) => {
        if(locData.geonames.length === 0) {
            return;
        }
        let arr = [];
        ['lat', 'lng', 'countryName'].forEach((i) => {
            arr.push(locData.geonames[0][i]);
        });
        const country = arr[2];
        //Set units for US -> Fahrenheit
        if(country === 'United States') {
            return getData(weatherApiUrl + `&lat=${arr[0]}&lon=${arr[1]}&units=I&key=${weatherApiKey}`);
        } else {
            //Get weather data from Weatherbit
            return getData(weatherApiUrl + `&lat=${arr[0]}&lon=${arr[1]}&key=${weatherApiKey}`);
        }
    })
    .then((weatherData) => {
        if(!weatherData) {
            return ;
        }
        //Get time data from howSoon function
        const [tripStart, tripEnd, tripLength] = howSoon();
        const temp = weatherData['data'][0]['temp'];
        const icon = weatherData['data'][0]['weather']['icon'];
        const desc = weatherData['data'][0]['weather']['description'];
        const countryCode = weatherData['data'][0]['country_code'];
        //Send data to be stored in projectData object via POST
        return postData('/add', {location, countryCode, tripStart, tripEnd, tripLength, temp, icon, desc})
    })
    .then((updateData) => {
        if(!updateData) {
            return;
        }
        //Update UI
        updateUI(updateData);
        //Reset form
        document.querySelector('form').reset();
    })
    .catch((error) => {
        showError('We don\'t have that location in our database')
    });
};

//Add event listener for main function
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
            showError(error);
        }
};

const updateUI = async (updateData) => {
    //Update UI with obtained data
    let img = await getData(imgApiUrl + imgApiKey + `&q=${updateData.location}&category=travel&image_type=photo`);
    if(img.total === 0) {
        //If no imgs found, display one from travel category
        img = await getData(imgApiUrl + imgApiKey + `&q=&category=travel&image_type=photo`);
    }
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
    showCard();
};

const howSoon = () => {
    //Obtain departure date and calculate number of days to departure
    const now = new Date();
    let tripStart = document.getElementById('depart').value;
    let tripEnd = document.getElementById('return').value;
    const departureDate = new Date(tripStart);
    const returnDate = new Date(tripEnd);
    const tripLength = parseInt((returnDate.getTime() - departureDate.getTime()) / 86400000);
    [tripStart, tripEnd].forEach((t) => {
        t.split('-').reverse().join('/');
    });
    return [tripStart, tripEnd, tripLength]
};

const showError = (error) => {
    //Show errors as pop-up
    const errorMsg = document.createElement('div');
    errorMsg.id = 'errorMsg';
    errorMsg.innerHTML = `${error}`;
    document.querySelector('main').appendChild(errorMsg);
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 3000);
    document.querySelector('form').reset();
    return;
};

const printPage = () => {
    //Print current page
    window.print()
}
//Attach close icon event listener to close travel card and to print the page
document.querySelector('.close').addEventListener('click', Client.showCard);
document.querySelector('#print-btn').addEventListener('click', printPage);

export {
    getData,
    processData,
    postData,
    updateUI
}




