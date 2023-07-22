import './Page.css';
import Sunny from "../img/Sunny.png";
import Fog from "../img/Fog.png";
import Cloudy from "../img/Cloudy.png";
import Snow from "../img/Snow.png";
import Rain from "../img/Heavy-rain.png";
import Partly_cloudy from "../img/Partly-cloudy.png";
import Partly_cloudy_night from "../img/Partly-cloudy-night.png";
import Clear_night from "../img/Clear-night.png";
import Thunder from "../img/Sever-thunderstorm.png";
import Rain_Thunder from "../img/Rain&Thunderstorm.png";
import { useEffect, useState } from 'react';

const Page = () => {
    const [pagebg, setPagebg] = useState(null);
    const [infobg, setInfobg] = useState('dark-bg');
    const [infotxt, setInfotxt] = useState('dark-txt');
    const [weathericon, setWeathericon] = useState(null);

    const [city, setCity] = useState("New Delhi");
    const [weathertype, setWeathertype] = useState('Thunderstorm with rain');
    const [temperaturedata, setTemperaturedata] = useState('X');
    const [cityname, setCityname] = useState('City Name');
    const [clouddata, setClouddata] = useState(null);
    const [winddata, setWinddata] = useState(null);
    const [humiditydata, setHumiditydata] = useState(null);
    const [uvdata, setUvdata] = useState(null);

    const [isday, setisDay] = useState(null);

    const handlebg = (weathertype) => {
        if (weathertype === 'Sunny') {
            setPagebg('Sunny');
            setInfobg('dark-bg');
            setInfotxt('dark-txt');
            setWeathericon(Sunny);
        } else if ((weathertype === 'Mist') || (weathertype === 'Fog') || (weathertype === 'Freezing fog')) {
            setPagebg('Foggy');
            setInfobg('dark-bg');
            setInfotxt('light-txt');
            setWeathericon(Fog);
        } else if ((weathertype === 'Overcast') || (weathertype === 'Cloudy')) {
            setPagebg('Cloudy');
            setInfobg('dark-bg');
            setInfotxt('light-txt');
            setWeathericon(Cloudy);
        } else if ((weathertype === 'Snow') || (weathertype === 'Patchy snow possible') || (weathertype === 'Blowing snow') || (weathertype === 'Blizzard') || (weathertype === 'Patchy light snow') || (weathertype === 'Light snow') || (weathertype === 'Patchy moderate snow') || (weathertype === 'Moderate snow') || (weathertype === 'Patchy heavy snow') || (weathertype === 'Heavy snow') || (weathertype === 'Light snow showers') || (weathertype === 'Moderate or heavy snow showers')) {
            setPagebg('Snow');
            setInfobg('dark-dark-bg');
            setInfotxt('light-txt');
            setWeathericon(Snow);
        } else if ((weathertype === 'Rainy') || (weathertype === 'Patchy rain possible') || (weathertype === 'Patchy freezing drizzle possible') || (weathertype === 'Patchy light drizzle') || (weathertype === 'Light drizzle') || (weathertype === 'Freezing drizzle') || (weathertype === 'Heavy freezing drizzle') || (weathertype === 'Patchy light rain') || (weathertype === 'Light rain') || (weathertype === 'Moderate rain at times') || (weathertype === 'Moderate rain') || (weathertype === 'Heavy rain at times') || (weathertype === 'Heavy rain') || (weathertype === 'Light freezing rain') || (weathertype === 'Moderate or heavy freezing rain') || (weathertype === 'Light rain shower') || (weathertype === 'Moderate or heavy rain shower') || (weathertype === 'Torrential rain shower')) {
            setPagebg('Rainy');
            setInfobg('dark-bg');
            setInfotxt('light-txt');
            setWeathericon(Rain);
        } else if (weathertype === 'Partly cloudy') {
            if (isday === 1) {
                setPagebg('Partly-cloudy-day');
                setInfobg('dark-bg');
                setInfotxt('light-txt');
                setWeathericon(Partly_cloudy);
            } else {
                setPagebg('Partly-cloudy-night');
                setInfobg('light-bg');
                setInfotxt('light-txt');
                setWeathericon(Partly_cloudy_night);
            }
        } else if (weathertype === 'Clear') {
            setPagebg('Clear-night');
            setInfobg('light-bg');
            setInfotxt('light-txt');
            setWeathericon(Clear_night);
        } else if ((weathertype === 'Thundery outbreaks possible') ||  (weathertype === 'Thunderstorm')) {
            setPagebg('Thunder');
            setInfobg('light-bg');
            setInfotxt('light-txt');
            setWeathericon(Thunder);

        } else if ((weathertype === 'Patchy light rain with thunder') || (weathertype === 'Moderate or heavy rain with thunder') || (weathertype === 'Thunderstorm with rain')) {
            setPagebg('Thunder_rain');
            setInfobg('light-bg');
            setInfotxt('light-txt');
            setWeathericon(Rain_Thunder);
        }
    }


    useEffect(() => {
        handlebg(weathertype);
    }, [weathertype]);


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCity(e);
        }
    }

    const handleCity = (e) => {
        e.preventDefault();
        setCity(e.target.value);
        e.target.value = '';
    }

    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchWeatherData = async (city) => {
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + city;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
            const data = JSON.parse(result);
            console.log(data);
            setCityname(data.location.name);
            setWeathertype(data.current.condition.text);
            setTemperaturedata(data.current.temp_c);
            setClouddata(data.current.cloud);
            setWinddata(data.current.wind_kph);
            setHumiditydata(data.current.humidity);
            setUvdata(data.current.uv);
            setisDay(data.current.is_day);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [ city ]);

    return (
        <div className={`page ${pagebg}`}>
            <div className={`info ${infobg} ${infotxt}`}>
                <div className="input">
                    <form action="" id='form'>
                        <input type="text" placeholder='Enter city name' id='city_input' onKeyDown={handleKeyPress} />
                    </form>
                </div>
                <div className="weather-icon">
                    <img src={ weathericon } alt={ weathertype } id='weather_icon' />
                </div>
                <p className='weather-type' id='weather_type'>{weathertype}</p>
                <p className='temperature' id='temperature'>{temperaturedata} °C</p>
                <p className='city-name' id='city_name'>{cityname}</p>
                <div className="weather-details-box">
                    <span className="weather-details">Cloud % - {clouddata}</span>
                    <span className="weather-details">Wind - {winddata}</span>
                    <span className="weather-details">Humidity - {humiditydata}</span>
                    <span className="weather-details">UV Index - {uvdata}</span>
                </div>
            </div>
        </div>
    );
}

export default Page;