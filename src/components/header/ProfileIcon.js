import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsOpen, setModalDirection, setType } from '../../reducers/modal';
import profileIcon from '../../img/Profile-Icon.png';

function ProfileIcon() {
	const dispatch = useDispatch();
	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				dispatch(setType('profile'));
				dispatch(setModalDirection('right'));
				dispatch(setIsOpen(true));
			}}
			className='h-3/4 aspect-auto'
		>
			<img src={profileIcon} />
		</button>
	);
}

export default ProfileIcon;
