import React from 'react';
import { Link } from 'react-router-dom';

function MenuCard({ icon, name, link }) {
	return (
		<Link
			to={link}
			className='mx-4 my-3 flex gap-4 items-center'
		>
			<div className='w-6 mt-2 aspect-auto'>
				<img src={icon} />
			</div>

			<h3 className='mt-1 font-medium'>{name}</h3>
		</Link>
	);
}

export default MenuCard;
