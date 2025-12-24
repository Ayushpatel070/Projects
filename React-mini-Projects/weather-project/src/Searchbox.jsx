import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Searchbox.css";
import { useState } from 'react';

const Searchbox = ({ updateInfo }) => {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "e97bbf697195162a21336f67c1d83638";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            // if (jsonResponse.cod !== 200) {
            //     throw new Error("City not found");
            // }
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            }
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handlecity = (e) => {
        setCity(e.target.value);
        setError(false);
    }

    let submit = async (e) => {
        try {
            e.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
        }
    }
    return (
        <div className='searchbox'>
            <form action="" onSubmit={submit}>
                <TextField id="city" label="City name" variant="outlined" required value={city} onChange={handlecity} />
                <br /> <br />
                <Button variant="contained" type='submit'>Send</Button>
                {error && <p style={{ color: "red" }}>No such place Exist..</p>}
            </form>
        </div>
    )
}

export default Searchbox
