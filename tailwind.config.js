/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/hooks/**/*.{js,jsx,ts,tsx}',
		'./src/reducers/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			animation: {
				slideInLeft: 'slideInLeft 0.5s ease-in-out',
				slideInRight: 'slideInRight 0.5s ease-in-out',
				slideUp: 'slideUp 0.5s ease-in-out',
			},
			keyframes: {
				slideInLeft: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideInRight: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideUp: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
};
