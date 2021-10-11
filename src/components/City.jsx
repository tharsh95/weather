import React from 'react'
import './city.css'
import NotFound from './NotFound'
const City = ({ data, main, weather, error }) => {
    return (

        <div id="singleCity">
            {error !== 404 ?
                <div>
                    <div id="nameTemp">
                        <h1>{data.name}</h1>
                        <h2>{Math.round(main.temp)}&deg;C</h2>
                    </div>
                    <div id="humDes">
                        <p><strong>Humidity:</strong>{main.humidity}%</p>
                        {weather.map(el => <p id='des' key={el.id}>{el.description}</p>)}
                    </div>
                    <div id='fp'>
                        <p><strong>Feels like:</strong> {Math.round(main.feels_like)}&deg;C</p>
                        <p><strong>Pressure</strong>{main.pressure}mBar</p>
                    </div>
                </div>
                :
                <div id='nf'><NotFound/></div>
            }
        </div>

    )
}

export default City
