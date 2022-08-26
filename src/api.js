export const geoAPIOptions = {
	method: 'GET',
	url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
	params: { limit: '5', minPopulation: '50000' },
	headers: {
		'X-RapidAPI-Key': '93a2314052mshe17da8e6de610f2p104fb8jsnd5349ad069ee',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
	},
};

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/';

export const WEATHER_API_KEY = '4bd3959cc9580bbbb8bd994043062203';
