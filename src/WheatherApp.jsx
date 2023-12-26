import { useState, useSyncExternalStore } from "react"

const WheatherApp = () => {

const urlBase = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = '697af5611e68ee52b16e6ba5272839d3'   
const [ciudad, setCiudad] = useState('')  
const [dataClima, setDataClima] = useState(null)
const difKelvin = 273.15

const handleCambioCiudad = (event) => {

    setCiudad(event.target.value)
}

const handleSubmit = (event) => {

event.preventDefault()

if (ciudad.length > 0) fetchClima()
}

const fetchClima = async () => {
    try {
        const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
        const data = await response.json()
        setDataClima(data)
    }
    catch{
        console.error('Ocurrio el siguiente problema: ', error)
    }
}

    return (
    <div className="container">
    <h1> Aplicacion del clima</h1>
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={ciudad}
        onChange={handleCambioCiudad}
        />
        <button type="submit">Buscar</button>
    </form>
    {dataClima && (
        <div> 
            <h2>{dataClima.name} </h2>
            <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
            <p>Condición meteorologica: {dataClima.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
        </div>    
    )
    }
    </div>
)
}

export default WheatherApp



