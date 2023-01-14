import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/weather-simple-forecast-app/',
	server: {
		host: true,
		port: '3000',
		hot: true,
	},
});
