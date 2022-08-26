import { useAppContext } from '../../context/AppContext';
import moment from 'moment';

const CurrentDetails = () => {
	const { isLoaded, currentWeather, settingsSpeedUnits, settingsTimeUnits } =
		useAppContext();
	let sunsetTime,
		sunriseTime = '';
	let windSpeedMiles = '';

	if (isLoaded) {
		//format sunrise and sunset times
		sunriseTime = new Date(currentWeather.sys.sunrise * 1000);
		if (settingsTimeUnits === '12hour') {
			sunriseTime = moment(sunriseTime).format('h:mm a');
		} else {
			sunriseTime = moment(sunriseTime).format('H:mm');
		}
		sunsetTime = new Date(currentWeather.sys.sunset * 1000);
		if (settingsTimeUnits === '12hour') {
			sunsetTime = moment(sunsetTime).format('h:mm a');
		} else {
			sunsetTime = moment(sunsetTime).format('HH:mm');
		}
		//convert speed from kph to mph if necessary
		if (settingsSpeedUnits === 'miles') {
			windSpeedMiles = currentWeather.wind.speed * 0.621371;
		}
	}

	if (isLoaded) {
		return (
			<div className='flex-col content-center items-center relative w-full px-10 md:w-2/3 lg:w-2/5'>
				<h4 className='text-white text-md tracking-wide opacity-75 mb-2 mt-8'>
					TODAY'S DETAILS
				</h4>
				<div className='bg-blue-100/40 rounded-md px-3 py-2 mb-10 mt-2 text-center'>
					<div className='flex justify-between  lg:justify-around items-center  text-white text-sm md:text-base tracking-wide opacity-75 '>
						<span className='w-2/5'>Sunrise</span>
						<span className='w-2/5'>Sunset</span>
					</div>
					<div className='flex justify-between  lg:justify-around items-center mb-4  text-white text-md md:text-lg tracking-wide '>
						<span className='w-2/5'>{sunriseTime}</span>
						<span className='w-2/5'>{sunsetTime}</span>
					</div>
					<div className='flex justify-between lg:justify-around items-center  text-white text-sm md:text-base tracking-wide opacity-75 '>
						<span className='w-2/5'>Wind Speed</span>
						<span className='w-2/5'>Wind Degrees</span>
					</div>
					<div className='flex justify-between lg:justify-around items-center mb-4  text-white text-md md:text-lg tracking-wide '>
						<span className='w-2/5'>
							{settingsSpeedUnits === 'kilometers'
								? `${currentWeather.wind.speed} km/h`
								: `${Math.round(windSpeedMiles * 100) / 100} mph`}
						</span>
						<span className='w-2/5'>{currentWeather.wind.deg}°</span>
					</div>
					<div className='flex justify-between lg:justify-around items-center  text-white text-sm md:text-base tracking-wide opacity-75 '>
						<span className='w-2/5'>Humidity</span>
						<span className='w-2/5'>Cloud Coverage</span>
					</div>
					<div className='flex justify-between lg:justify-around items-center  text-white text-md md:text-lg tracking-wide '>
						<span className='w-2/5'>{currentWeather.main.humidity}%</span>
						<span className='w-2/5'>{currentWeather.clouds.all}%</span>
					</div>
				</div>
			</div>
		);
	} else {
		return '';
	}
};

export default CurrentDetails;
