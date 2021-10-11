
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import City from './components/City';

function App() {
    const [data, setData] = useState({})
    const [main, setMain] = useState({})
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState([])
    const [error, setError] = useState()
    const [image, setImage] = useState('')
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const fetchData = async () => {
        try {
            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=57720d11b2fcb156eeb5937cf8d807db&units=metric`)

            setData(data.data)
            setMain(data.data.main)
            setWeather(data.data.weather)
            setError(200)
            const image = await axios.get(`https://pixabay.com/api/?key=13349591-1c0e4f0de040d4a1df88f0feb&q=${data.data.weather[0].description}}&page=1&per_page=30`)
            setImage(image.data.hits[Math.floor(Math.random() * 30)].largeImageURL)

        }
        catch (err) {
            setError(404)
        }
    }
    const handleClick = () => {
        fetchData()
        setCity("")

    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        })
        const fetchData = async () => {
            try{
                const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=57720d11b2fcb156eeb5937cf8d807db&units=metric`)
                setData(data.data)
                setMain(data.data.main)
                setWeather(data.data.weather)
                setError(200)
                const image = await axios.get(`https://pixabay.com/api/?key=13349591-1c0e4f0de040d4a1df88f0feb&q=${data.data.weather[0].description}}&page=1&per_page=100`)
                setImage(image.data.hits[Math.floor(Math.random() * 99)].largeImageURL)
            }
            catch(err){
                setError(404)
            }
        }
        fetchData()
    }, [lat, lon])

    return (
        <div className='main' style={{
            backgroundImage: `url(${image})`, backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
        }}>
            <div id='header'>
            <h1><span>Silent</span>Weather</h1>
            </div>
            <div id="input">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <button onClick={handleClick}>Search</button>
            </div>
            <div id="city">
                <City data={data} main={main} weather={weather} error={error} />
            </div>
        </div>
    );
}

export default App;
