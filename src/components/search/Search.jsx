import { AsyncPaginate } from 'react-select-async-paginate';
import { useState } from 'react';
import { geoAPIOptions } from '../../api';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import moment from 'moment';
import { GoLocation } from 'react-icons/go';

const Search = () => {
	const { handleOnSearchChange, searched, isLoaded, time, settingsTimeUnits } =
		useAppContext();
	const URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
	const [search, setSearch] = useState(null);
	let timeStamp = '';

	const handleOnChange = async (searchData) => {
		setSearch(searchData);
		const values = await handleOnSearchChange(searchData);
		searched();
	};

	//get user location
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const { latitude, longitude } = position.coords;
				const locationData = {
					value: `${latitude} ${longitude}`,
					label: 'Current Location',
				};
				handleOnChange(locationData);
			});
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	};

	//options for the search bar
	const loadOptions = async (inputValue) => {
		try {
			const { data } = await axios.get(
				`${URL}?&namePrefix=${inputValue}`,
				geoAPIOptions
			);
			return {
				options: data.data.map((city) => {
					return {
						value: `${city.latitude} ${city.longitude}`,
						label: `${city.name}, ${city.region}, ${city.country}`,
					};
				}),
			};
		} catch (error) {
			console.log(error);
		}
	};

	//format timestamp for search result update
	if (isLoaded) {
		try {
			timeStamp = new Date(time * 1000);
			if (settingsTimeUnits === '12hour') {
				timeStamp = moment(timeStamp).format('MMMM Do, h:mm a');
			} else {
				timeStamp = moment(timeStamp).format('MMMM Do, HH:mm');
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className='absolute top-8 left-5 w-76 h-30 lg:w-auto lg:h-auto'>
				{isLoaded ? (
					<h1 className=' text-white text-4xl lg:text-5xl lg:ml-16 mb-10 tracking-wide truncate py-2 px-1'>{`${
						search.label.split(',')[0]
					}`}</h1>
				) : (
					<h1 className='text-white text-4xl lg:text-5xl lg:ml-16 mb-10 tracking-wide py-2 px-1'>
						WeatherSimple
					</h1>
				)}
				<p className='relative left-1 text-white text-sm lg:text-base tracking-wide lg:ml-16 -mt-10 ml-1 opacity-75'>
					{isLoaded ? `Updated: ${timeStamp}` : ''}
				</p>
			</div>
			<div className='flex items-center py-10 pl-6 pr-8 w-full md:w-3/4 lg:w-2/5 cursor-pointer'>
				<AsyncPaginate
					placeholder='Search for a city'
					debounceTimeout={600}
					value={search}
					onChange={handleOnChange}
					loadOptions={loadOptions}
					className='text-black w-full'
				/>

				{/* <BiCurrentLocation */}
				<GoLocation
					className='relative left-2 text-white cursor-pointer'
					onClick={() => {
						getLocation();
					}}
					size={28}
				/>
			</div>
		</>
	);
};

export default Search;
