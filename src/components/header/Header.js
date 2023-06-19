import React from 'react';

function Header({ children }) {
	return (
		<div className='px-4 sticky top-0 h-16 bg-zinc-800 flex items-center justify-between'>
			{children}
		</div>
	);
}

export default Header;
