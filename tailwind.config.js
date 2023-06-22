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
			placeholderColor: ['responsive', 'dark', 'focus', 'hover', 'active'],
			fontSize: {
				sm: '0.85rem',
			},
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
				borderWidth: {
					DEFAULT: '1px',
					0: '0',
					2: '2px',
					3: '3px',
					4: '4px',
					6: '6px',
					8: '8px',
				},
			},
		},
	},
	plugins: [],
};
