//recieves an array of 3 hour weather updates and returns the cumulative weather values for that day
const findDailyValues = (dayArray) => {
	const dayMax = Math.max(...dayArray.map((item) => item.main.temp_max));
	const dayMin = Math.min(...dayArray.map((item) => item.main.temp_min));
	const dayAvgTemp = Math.round(
		dayArray.reduce((acc, item) => acc + item.main.feels_like, 0) /
			dayArray.length
	);
	const dayAvgHumidity = Math.round(
		dayArray.reduce((acc, item) => acc + item.main.humidity, 0) /
			dayArray.length
	);
	const dayAvgWind =
		Math.round(
			(dayArray.reduce((acc, item) => acc + item.wind.speed, 0) /
				dayArray.length) *
				100
		) / 100;
	const dayAvgPressure = Math.round(
		dayArray.reduce((acc, item) => acc + item.main.pressure, 0) /
			dayArray.length
	);
	const dayAvgClouds = Math.round(
		dayArray.reduce((acc, item) => acc + item.clouds.all, 0) / dayArray.length
	);
	//get the string that appears the most times in weather[0].description
	const dayMostCommonWeather = dayArray.reduce(
		(acc, item) => {
			const { description } = item.weather[0];
			const count = acc.counts[description] || 0;
			acc.counts[description] = count + 1;
			if (count > acc.count) {
				acc.count = count;
				acc.weather = description;
			}
			return acc;
		},
		{ counts: {}, count: 0, weather: '' }
	);
	//get the string that appears the most times in weather[0].icon
	const dayMostCommonIcon = dayArray.reduce(
		(acc, item) => {
			const { icon } = item.weather[0];
			const count = acc.counts[icon] || 0;
			acc.counts[icon] = count + 1;
			if (count > acc.count) {
				acc.count = count;
				acc.icon = icon;
			}
			return acc;
		},
		{ counts: {}, count: 0, icon: '' }
	);
	if (dayMostCommonIcon.icon === '') {
		dayMostCommonIcon.icon = dayArray[0].weather[0].icon;
	}
	if (dayMostCommonWeather.weather === '') {
		dayMostCommonWeather.weather = dayArray[0].weather[0].description;
	}
	return {
		dayMax,
		dayMin,
		dayAvgTemp,
		dayAvgHumidity,
		dayAvgWind,
		dayAvgPressure,
		dayAvgClouds,
		dayMostCommonWeather,
		dayMostCommonIcon,
	};
};

export default findDailyValues;
