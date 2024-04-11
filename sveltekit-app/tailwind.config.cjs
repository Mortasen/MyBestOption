const defaultColors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: {
					...defaultColors.sky,
					925: '#044232',
					999: '#01231b'
				},
				secondary: defaultColors.yellow,
			},
		},
	},

	plugins: [],
};

module.exports = config;
