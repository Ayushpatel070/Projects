import Searchbox from "./Searchbox";
import Infobox from "./Infobox";
import { useState } from "react";

const WeatherApp = () => {
    const [weatherinfo, setWeatherinfo] = useState(null);

    const updateInfo = (result) => {
        setWeatherinfo(result);
    }
  return (
    <div style={{textAlign : "center"}}>
        <h1>Weather App</h1>
      <Searchbox updateInfo={updateInfo} />
      {weatherinfo && <Infobox info={weatherinfo} />}
    </div>
  )
}

export default WeatherApp
