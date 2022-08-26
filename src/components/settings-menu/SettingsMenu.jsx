import React from 'react';
import { useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';
import { AiOutlineClose } from 'react-icons/ai';
import './settings-menu.css';
import { useAppContext } from '../../context/AppContext';

const SettingsMenu = () => {
	const {
		settingsTemperatureUnits,
		settingsSpeedUnits,
		settingsTimeUnits,
		handleSettingsChange,
	} = useAppContext();
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='flex justify-end mb-24 mr-6 w-full h-8 lg:mr-32'>
			{isOpen ? (
				<>
					<AiOutlineClose
						className=' relative top-11 cursor-pointer  text-white z-50'
						size={32}
						onClick={handleClick}
					/>
					<div className='nav bg-blue-500 drop-shadow-2xl'>
						<div className='flex w-full mt-12 text-white text-md lg:text-lg tracking-wide text-center justify-center'>
							<h1>PREFERENCES</h1>
						</div>
						<h2 className='mt-16 mb-5 ml-10 text-white'>TEMPERATURE</h2>
						<div className='ml-10'>
							<label className='container'>
								Celcius
								<input
									type='radio'
									value='celcius'
									checked={settingsTemperatureUnits === 'celcius'}
									name='radio1'
									onChange={handleSettingsChange}
								/>
								<span className='checkmark'></span>
							</label>
							<label className='container'>
								Fahrenheit
								<input
									type='radio'
									value='fahrenheit'
									checked={settingsTemperatureUnits === 'fahrenheit'}
									name='radio1'
									onChange={handleSettingsChange}
								/>
								<span className='checkmark'></span>
							</label>
						</div>
						<h2 className='mt-10 mb-5 ml-10 text-white'>SPEED</h2>
						<div className='ml-10'>
							<label className='container'>
								Kilometers per hour
								<input
									type='radio'
									value='kilometers'
									checked={settingsSpeedUnits === 'kilometers'}
									name='radio2'
									onChange={handleSettingsChange}
								/>
								<span className='checkmark'></span>
							</label>
							<label className='container'>
								Miles per hour
								<input
									type='radio'
									value='miles'
									checked={settingsSpeedUnits === 'miles'}
									name='radio2'
									onChange={handleSettingsChange}
								/>
								<span className='checkmark'></span>
							</label>
						</div>
						<h2 className='mt-10 mb-5 ml-10 text-white'>TIME</h2>
						<div className='ml-10'>
							<label className='container'>
								12 Hour
								<input
									type='radio'
									value='12hour'
									checked={settingsTimeUnits === '12hour'}
									name='radio3'
									onChange={handleSettingsChange}
								/>
								<span className='checkmark'></span>
							</label>
							<label className='container'>
								24 Hour
								<input
									type='radio'
									value='24hour'
									checked={settingsTimeUnits === '24hour'}
									name='radio3'
									onChange={handleSettingsChange}
								/>
								<span className='checkmark'></span>
							</label>
						</div>
					</div>
				</>
			) : (
				<>
					<GoKebabVertical
						className='relative top-11 cursor-pointer text-white'
						size={32}
						onClick={handleClick}
					/>
					<div className='nav-hidden bg-blue-100 drop-shadow-2xl'></div>
				</>
			)}
		</div>
	);
};

export default SettingsMenu;
