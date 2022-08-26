import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemPanel,
	AccordionItemButton,
} from 'react-accessible-accordion';
import { useAppContext } from '../../context/AppContext';
import WeatherIcon from '../misc/WeatherIcon';
import {
	convertCelciusToFahrenheit,
	findDailyValues,
	dayArrays,
} from '../../helpers/index.js';

const ForecastWeatherList = () => {
	const { forecastWeather, settingsTemperatureUnits, settingsSpeedUnits } =
		useAppContext();
	const forecastWeatherList = forecastWeather.list;
	const dayInAWeek = new Date().getDay();
	const WEEK_DAYS = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

	//set up the days of the week for the forecast
	const forecastDays = WEEK_DAYS.slice(dayInAWeek + 1, dayInAWeek + 6);
	if (forecastDays.length !== 5) {
		forecastDays.push(...WEEK_DAYS.slice(0, 5 - forecastDays.length));
	}

	//destructuring forecastWeatherList into days
	const [dayOne, dayTwo, dayThree, dayFour, dayFive] =
		dayArrays(forecastWeatherList);

	//getting daily values for each day
	const dailyValues = [
		findDailyValues(dayOne),
		findDailyValues(dayTwo),
		findDailyValues(dayThree),
		findDailyValues(dayFour),
		findDailyValues(dayFive),
	];

	//convert temperatures to fahrenheit if settings is fahrenheit
	if (settingsTemperatureUnits === 'fahrenheit') {
		dailyValues.forEach((day) => {
			day.dayMax = convertCelciusToFahrenheit(day.dayMax);
			day.dayMin = convertCelciusToFahrenheit(day.dayMin);
			day.dayAvgTemp = convertCelciusToFahrenheit(day.dayAvgTemp);
		});
	}

	return (
		<div>
			<Accordion allowZeroExpanded>
				{dailyValues.map((item, index) => (
					<AccordionItem key={index}>
						<AccordionItemHeading>
							<AccordionItemButton>
								<div className='flex justify-start md:justify-around items-center bg-blue-100/30 rounded-md mb-2 px-2 py-0.5 text-center'>
									{/* ICON */}
									<span className='w-1/8'>
										<WeatherIcon
											id={item.dayMostCommonIcon.icon}
											className='md:w-1/5'
										/>
									</span>
									<span className='text-white text-sm md:text-lg tracking-wide w-1/12 ml-3 mr-5 md:mr-0 md:ml-0 md:w-1/6'>
										{forecastDays[index]}
									</span>
									<span className='text-white text-sm md:text-lg tracking-wide capitalize md:w-1/3'>
										{/* DESCRIPTION */}
										{item.dayMostCommonWeather.weather}
									</span>
									{/* MIN/MAX TEMPERATURE */}
									<span className='text-white text-sm md:text-lg tracking-wide capitalize ml-auto md:ml-0 md:w-1/8'>
										{Math.round(item.dayMax) + '°'}/
										{Math.round(item.dayMin) + '°'}
									</span>
								</div>
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							{/* DETAILS */}
							<div className='flex justify-between   md:justify-evenly items-center rounded-md mb-2 px-1 text-sm text-white text-center opacity-75'>
								<span className='md:w-1/8'>Feels Like: {item.dayAvgTemp}°</span>
								<span className='md:w-1/8'>
									Humidity: {item.dayAvgHumidity}%
								</span>
							</div>
							<div className='flex justify-between  md:justify-evenly items-center rounded-md mb-2 px-1 text-sm text-white text-center opacity-75'>
								<span className='md:w-1/8'>
									Pressure: {item.dayAvgPressure}hPa
								</span>
								<span className='md:w-1/8'>
									Cloud Coverage: {item.dayAvgClouds}%
								</span>
							</div>
							<div className='flex justify-between  md:justify-evenly items-center rounded-md mb-2 px-1 text-sm text-white text-center opacity-75'>
								<span className='md:w-1/8'>
									Sea Level: {item.dayAvgPressure}m
								</span>
								<span className='md:w-1/8'>
									Wind Speed:{' '}
									{settingsSpeedUnits === 'kilometers'
										? `${item.dayAvgWind} km/h`
										: `${
												Math.round(item.dayAvgWind * 0.621371 * 100) / 100
										  } mph`}
								</span>
							</div>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default ForecastWeatherList;
