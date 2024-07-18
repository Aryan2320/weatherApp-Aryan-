import React, { useState, useEffect } from "react";
import './weather.css';
import clear from './clear.png';
import cloud from './cloud.png';
import humidity from './humidity.png';
import mist from './mist.png';
import rain from './rain.png';
import snow from './snow.png';
// import wind from './wind.png';
import error from './404.png';
// import nightimg from './night.jpg';

const WeatherDisplay = () => {
    const [apiData, setApiData] = useState([]);
    const [click, setClick] = useState(false);
    const [citySearch, setSearch] = useState('');
    const [weatherImage, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const searchFunction = (e) => {
        setSearch(e.target.value);
    }

    const fetchData = async (city) => {
        try {
            let rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=9470f162a34d93086760b16d1426a9ed`);
            if (!rawData.ok) {
                throw new Error('Error! 404 City not found');
            }
            let finalData = await rawData.json();
            setApiData(finalData);
            setErrorMessage('');
            switch (finalData.weather[0].main) {
                case 'Clouds':
                    setImage(cloud);
                    break;
                case 'Rain':
                    setImage(rain);
                    break;
                case 'Clear':
                    setImage(clear);
                    break;
                case 'Mist':
                    setImage(mist);
                    break;
                case 'Snow':
                    setImage(snow);
                    break;
                case 'Haze':
                    setImage(mist);
                    break;
                default:
                    break;
            }
        } catch (e) {
            setApiData([]);
            setImage(error);
            setErrorMessage(e.message);
        }
    }

    const handleClick = () => {
        setClick(true);
        if (citySearch === '' && click === true) {
            alert("Please Enter Location For Search");
            return;
        }
        if (citySearch.trim() !== '') {
            fetchData(citySearch);
        }
    }

    useEffect(() => {
        fetchData('hyderabad');
    }, []);

    return (
        <>
            <div className="container">
                <div className="weatherBox">
                    <div className="searchBox">
                        <input
                            type="text"
                            className="citySearch"
                            placeholder="Enter Your Location"
                            value={citySearch}
                            onChange={searchFunction}
                        />
                        <button className="searchButton" onClick={handleClick}>Search</button>
                    </div>
                    <div className="weatherImg">
                        <img src={weatherImage} alt="Weather" style={{ width: '180px', height: '140px' }} />
                    </div>
                    {errorMessage && (
                        <div className="error">
                            <center><h3>{errorMessage.toUpperCase()}</h3></center>
                        </div>
                    )}
                    {apiData.name && (
                        <div><p className="city">{apiData.name}, {apiData.sys.country}</p></div>
                    )}
                    {apiData.main && (
                        <>
                            <div className="tempDisplay"> <p className="temp">{apiData.main.temp}°C</p></div>
                            <div className="min-maxTemp1">
                                <p className="min-max">Min Temp:</p>
                                <p className="min-max">Max Temp:</p>
                            </div>
                            <div className="max">
                                <p className="min-maxtemp">{apiData.main.temp_min}°C</p>
                                <p className="min-maxtemp"> {apiData.main.temp_max}°C</p>
                            </div>
                            <div className="windhumidname">
                                <p className="windName">Humdity</p>
                                <p className="windName">Wind Speed</p>
                            </div>
                            <div className="humid">
                                <span> <img className="humidImg" src={humidity} alt="Humidity" style={{ height: '30px', width: '40px' }} /> <p className="wind-humid">{apiData.main.humidity}%</p></span>
                                <span><img className="humidImg" src={humidity} alt="Wind Speed" style={{ height: '30px', width: '40px' }} /><p className="wind-humid"> {apiData.wind.speed}km/hr</p></span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default WeatherDisplay;
