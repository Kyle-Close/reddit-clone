import React from 'react';

function MenuCard({ icon, title }) {
	return (
		<button className='mx-4 my-6 flex gap-4 items-center'>
			<div className='w-6 mt-2 aspect-auto'>
				<img src={icon} />
			</div>

			<h3 className='mt-1 font-medium'>{title}</h3>
		</button>
	);
}

export default MenuCard;
