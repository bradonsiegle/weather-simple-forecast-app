import { WeatherIcons } from '../../assets/WeatherIcons';

//Return the weather icon based on the weather code
const WeatherIcon = ({ id }) => {
	let Type = WeatherIcons['default'];

	if (WeatherIcons[id]) {
		Type = WeatherIcons[id];
		return <Type size={32} color={'white'} />;
	} else {
		return '';
	}
};

export default WeatherIcon;
