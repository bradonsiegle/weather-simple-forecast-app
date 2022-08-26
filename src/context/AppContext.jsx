import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import {
	UPDATE_WEATHER,
	UPDATE_WEATHER_SUCCESS,
	SEARCHED,
	UPDATE_SETTINGS,
} from './actions';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../api';
import axios from 'axios';

const initialState = {
	currentWeather: {},
	forecastWeather: {},
	currentWeatherDescription: '',
	currentWeatherIcon: '',
	currentWeatherFeelsLike: '',
	currentWeatherTemp: '',
	currentWeatherMaxTemp: '',
	currentWeatherMinTemp: '',
	currentWeatherHumidity: '',
	currentWindSpeed: '',
	time: '',
	isLoaded: false,
	search: false,
	settingsTemperatureUnits: 'celcius',
	settingsSpeedUnits: 'kilometers',
	settingsTimeUnits: '12hour',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const searched = () => {
		dispatch({
			type: SEARCHED,
		});
	};

	const handleOnSearchChange = async (searchData) => {
		const [lat, lon] = searchData.value.split(' ');

		const currentWeatherResponse = axios.get(
			`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);
		const forecastWeatherResponse = axios.get(
			`${WEATHER_API_URL}forecast?&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		const values = await Promise.all([
			currentWeatherResponse,
			forecastWeatherResponse,
		]);

		const dataValues = values.map((value) => value.data);
		const currentWeather = dataValues[0];
		const forecastWeather = dataValues[1];
		dispatch({
			type: UPDATE_WEATHER,
			payload: { currentWeather, forecastWeather },
		});
		if (currentWeather.cod === 200 && forecastWeather.cod === '200') {
			dispatch({
				type: UPDATE_WEATHER_SUCCESS,
			});
		}
	};

	const handleSettingsChange = (e) => {
		const units = e.target.value;
		dispatch({
			type: UPDATE_SETTINGS,
			payload: { units },
		});
	};

	return (
		<AppContext.Provider
			value={{ ...state, handleOnSearchChange, searched, handleSettingsChange }}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
