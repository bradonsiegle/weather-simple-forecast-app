import { useAppContext } from '../../context/AppContext';
import ForecastWeatherList from './ForecastWeatherList';

const ForecastWeather = () => {
	const { isLoaded } = useAppContext();

	if (isLoaded) {
		return (
			<div className='flex-col justify-center items-center relative w-full md:w-2/3 lg:w-2/5 px-10'>
				<h4 className='text-white text-md tracking-wide opacity-75 mb-2'>
					5 DAY FORECAST
				</h4>
				<ForecastWeatherList />
			</div>
		);
	} else {
		return '';
	}
};

export default ForecastWeather;
