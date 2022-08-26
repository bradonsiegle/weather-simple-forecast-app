import Search from './search/Search';
import CurrentWeather from './current-weather/CurrentWeather';
import CurrentDetails from './current-weather/CurrentDetails';
import ForecastWeather from './forecast-weather/ForecastWeather';
import SettingsMenu from './settings-menu/SettingsMenu';

const Container = () => {
	return (
		<div className='flex flex-col space-y-0 items-center '>
			<SettingsMenu />
			<Search />
			<CurrentWeather />
			<ForecastWeather />
			<CurrentDetails />
		</div>
	);
};

export default Container;
