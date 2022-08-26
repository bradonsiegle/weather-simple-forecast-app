import {
	UPDATE_WEATHER,
	UPDATE_WEATHER_SUCCESS,
	SEARCHED,
	UPDATE_SETTINGS,
} from './actions';

import { initialState } from './AppContext';

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_WEATHER:
			return {
				...state,
				currentWeather: action.payload.currentWeather,
				forecastWeather: action.payload.forecastWeather,
				currentWeatherDescription:
					action.payload.currentWeather.weather[0].description,
				currentWeatherIcon: action.payload.currentWeather.weather[0].icon,
				currentWeatherFeelsLike: action.payload.currentWeather.main.feels_like,
				currentWeatherTemp: action.payload.currentWeather.main.temp,
				currentWeatherMaxTemp: action.payload.currentWeather.main.temp_max,
				currentWeatherMinTemp: action.payload.currentWeather.main.temp_min,
				time: action.payload.currentWeather.dt,
				currentWindSpeed: action.payload.currentWeather.wind.speed,
			};
		case UPDATE_WEATHER_SUCCESS:
			return {
				...state,
				isLoaded: true,
			};

		case SEARCHED:
			return {
				...state,
				search: true,
			};
		case UPDATE_SETTINGS:
			if (
				action.payload.units === 'celcius' ||
				action.payload.units === 'fahrenheit'
			) {
				return {
					...state,
					settingsTemperatureUnits: action.payload.units,
				};
			} else if (
				action.payload.units === 'kilometers' ||
				action.payload.units === 'miles'
			) {
				return {
					...state,
					settingsSpeedUnits: action.payload.units,
				};
			} else if (
				action.payload.units === '12hour' ||
				action.payload.units === '24hour'
			) {
				return {
					...state,
					settingsTimeUnits: action.payload.units,
				};
			} else return state;

		default:
			return state;
	}
};
export default reducer;
