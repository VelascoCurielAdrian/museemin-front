/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/**/*',
		'./node_modules/react-tailwindcss-select/dist/index.esm.js',
	],
	important: '#root',
	theme: {
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			height: {
				128: '36rem',
			},
			width: {
				128: '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
	plugins: [],
};
