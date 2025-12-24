import "./Infobox.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const Infobox = ({ info }) => {
    let COLD_URL = "https://images.unsplash.com/photo-1642177135007-e679c94714cb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let HOT_URL = "https://images.unsplash.com/photo-1557148492-0bd47001455a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VtbWVyJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D";
    let RAIN_URL ="https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFpbiUyMGNpdHl8ZW58MHx8MHx8fDA%3D";
    let ahmedabad = "https://images.unsplash.com/photo-1631589984116-1d60a32f391b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let bhavnagar = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Shri_Swaminarayan_Mandir_gate.jpg";
    let jamnagar = "https://www.gujarattourism.com/content/dam/gujrattourism/images/destinations/jamnagar/heritage/ranmal---lakhota-lake/Ranmal%20Lake%20(8).jpg";
    let gandhinagar = "https://www.kaavyaratna.com/assets/img/blog/why-live-in-gandhinagar.jpg";
    return (
        <div className="infobox">
            <div className="cardContainer">
                <Card sx={{ maxWidth: 455 }}>
                    <CardMedia
                        sx={{ height: 230 }}
                        image={info.humidity > 80 ? RAIN_URL : info.temp > 25 ? HOT_URL : COLD_URL}
                        // image = {info.city = "Ahmedabad" ? ahmedabad : info.city = "Bhavnagar" ? bhavnagar : info.city = "Jamnagar" ? jamnagar : info.city = "Gandhinagar" ? gandhinagar : ahmedabad}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <b>{info.city} {info.humidity > 80 ? <ThunderstormIcon/> : info.temp > 25 ? <SunnyIcon/> : <AcUnitIcon/>}</b>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                            <p>Temparature : {info.temp}&deg;C</p>
                            <p>Temparature Minimum : {info.tempMin}&deg;C</p>
                            <p>Temparature Maximum : {info.tempMax}&deg;C</p>
                            <p>Humidity : {info.humidity}</p>
                            <p>The weather can be described as <i> {info.weather}</i> and feels like {info.feelsLike}&deg;C</p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Infobox
