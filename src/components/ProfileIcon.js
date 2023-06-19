import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsOpen } from '../reducers/modal';
import profileIcon from '../img/Profile-Icon.png';

function ProfileIcon() {
	const dispatch = useDispatch();
	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				dispatch(setIsOpen(true));
			}}
			className='h-3/4 aspect-auto'
		>
			<img src={profileIcon} />
		</button>
	);
}

export default ProfileIcon;
