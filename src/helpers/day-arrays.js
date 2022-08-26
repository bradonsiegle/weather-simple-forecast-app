//recives an array of up to 45 objects (3 hour weather updates, 8 per day)
//aggregates the data into a single object for each day and returns an array of those objects
const dayArrays = (forecastWeatherList) => {
	const dayOne = forecastWeatherList
		.map((item, index) => {
			return item;
		})
		.slice(5, 13);
	const dayTwo = forecastWeatherList
		.map((item, index) => {
			return item;
		})
		.slice(13, 21);

	const dayThree = forecastWeatherList
		.map((item, index) => {
			return item;
		})
		.slice(21, 29);

	const dayFour = forecastWeatherList
		.map((item, index) => {
			return item;
		})
		.slice(29, 37);

	const dayFive = forecastWeatherList
		.map((item, index) => {
			return item;
		})
		.slice(37, 45);
	return [dayOne, dayTwo, dayThree, dayFour, dayFive];
};

export default dayArrays;
