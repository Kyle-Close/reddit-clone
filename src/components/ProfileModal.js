import React, { useEffect } from 'react';
import PopoutModal from '../components/PopoutModal';
import snoo from '../img/snoo.png';

import { useSelector, useDispatch } from 'react-redux';
import { setModalDirection } from '../reducers/modal';
import { auth } from '../firebase';

function ProfileModal({ direction, isOpen }) {
	const modal = useSelector((state) => state.modal);
	const authState = useSelector((state) => state.authState);
	const dispatch = useDispatch();

	useEffect(() => {
		// Set the modal direction and isOpen property
		// There is only 1 modal state. We change it's direction
		// Based on what modal we want to display
		console.log('Dispatching...');
		dispatch(setModalDirection(direction));
	}, [direction, authState]);

	const getProfileModalContents = () => {
		// Not logged in
		if (authState && authState.userId !== null) {
			return (
				<div className='mt-12 w-1/2 aspect-auto self-center'>
					<img
						className='object-cover'
						src={snoo}
					/>
				</div>
			);
		} else {
			console.log('User is logged in');
		}
	};

	// Display correct contents based on if user is logged in
	const modalContent = React.useMemo(
		() => getProfileModalContents(),
		[authState]
	);

	console.log('Latest modal content', modalContent);

	return <PopoutModal modal={modal}>{modalContent}</PopoutModal>;
}

export default ProfileModal;
