/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html, js, ts, vue}', './src/**/*'],
	important: '#root',
	theme: {
		extend: {
			height: {
				128: '36rem',
			},
		},
	},
	plugins: [],
};
