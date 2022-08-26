import { useAppContext } from '../../context/AppContext';
import { WeatherIcons } from '../../assets/WeatherIcons';
import { WiCloudRefresh, WiDirectionUp } from 'react-icons/wi';
import convertCelciusToFahrenheit from '../../helpers/celcius-to-fahrenheit.js';

const CurrentWeather = () => {
	const {
		currentWeatherDescription,
		currentWeatherIcon,
		isLoaded,
		search,
		settingsTemperatureUnits,
	} = useAppContext();

	let {
		currentWeatherFeelsLike,
		currentWeatherMaxTemp,
		currentWeatherMinTemp,
		currentWeatherTemp,
	} = useAppContext();

	let Type = WeatherIcons['default'];
	if (isLoaded) {
		try {
			Type = WeatherIcons[currentWeatherIcon];
			// convert temperatures to fahrenheit if settings is fahrenheit
			if (settingsTemperatureUnits === 'fahrenheit') {
				currentWeatherTemp = convertCelciusToFahrenheit(currentWeatherTemp);
				currentWeatherMinTemp = convertCelciusToFahrenheit(
					currentWeatherMinTemp
				);
				currentWeatherMaxTemp = convertCelciusToFahrenheit(
					currentWeatherMaxTemp
				);
				currentWeatherFeelsLike = convertCelciusToFahrenheit(
					currentWeatherFeelsLike
				);
				//round temperatures to nearest integer
			} else {
				currentWeatherTemp = Math.round(currentWeatherTemp);
				currentWeatherMinTemp = Math.round(currentWeatherMinTemp);
				currentWeatherMaxTemp = Math.round(currentWeatherMaxTemp);
				currentWeatherFeelsLike = Math.round(currentWeatherFeelsLike);
			}
		} catch (error) {
			console.log(error);
		}
	}

	if (isLoaded) {
		return (
			<>
				<div className='flex-col md:w-1/2 lg:w-1/5'>
					<div className='flex justify-center md:justify-around items-center relative bottom-2 '>
						<h1 className='text-white text-8xl lg:text-[100px] -mt-9'>
							{currentWeatherTemp}
							<span className='relative text-5xl text-white bottom-8'>°</span>
						</h1>

						<Type
							size={190}
							style={{ color: 'white' }}
							className=' -mr-5 p-0 '
						/>
						<p className='text-white text-[18px]  md:text-xl tracking-wide absolute bottom-10 left-1 md:left-6 capitalize'>
							{currentWeatherDescription}
						</p>
					</div>

					<div className='flex w-full relative bottom-10 right-1 md:left-5 -mt-2 '>
						<div className='flex items-center'>
							<WiDirectionUp
								size={30}
								style={{ color: 'white' }}
								className='-mr-1'
							/>
							<span className='text-white text-md md:text-lg tracking-wide'>
								{currentWeatherMaxTemp + '°'}
							</span>
						</div>
						<div className='flex items-center'>
							<WiDirectionUp
								size={30}
								style={{ color: 'white' }}
								className='relative -mr-1 bottom-[3px] lg:bottom-[1px]'
								transform='rotate(180)'
							/>
							<span className='text-white text-md md:text-lg tracking-wide'>
								{currentWeatherMinTemp + '°'}
							</span>
						</div>
					</div>
					<div className='flex relative left-1 bottom-10 md:left-7'>
						<div className='flex items-center'>
							<span className='text-white text-md md:text-lg tracking-wide relative left-1 opacity-75'>
								Feels Like: {currentWeatherFeelsLike + '°'}
							</span>
						</div>
					</div>
				</div>

				{/* bottom icons div */}
			</>
		);
	}
	if (search && !isLoaded) {
		return (
			<>
				<h1>SEARCHING</h1>
			</>
		);
	}
	return (
		<div className='flex-col text-center  mt-20 w-full'>
			<div className='relative flex w-full justify-center bottom-3'>
				<WiCloudRefresh size={180} color={'white'} />
			</div>
			<div>
				<p className='text-white text-xl tracking-wide font-medium ml-3 mr-3'>
					Search for a city or enable location services to view your weather
					report!
				</p>
			</div>
		</div>
	);
};

export default CurrentWeather;
