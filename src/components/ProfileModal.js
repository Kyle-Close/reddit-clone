import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import PopoutModal from '../components/PopoutModal';
import snoo from '../img/snoo.png';

import { useSelector, useDispatch } from 'react-redux';
import { setModalDirection } from '../reducers/modal';

function ProfileModal({ direction }) {
	const navigate = useNavigate();
	const modal = useSelector((state) => state.modal);
	const authState = useSelector((state) => state.authState);
	const dispatch = useDispatch();

	useEffect(() => {
		// Set the modal direction and isOpen property
		// There is only 1 modal state. We change it's direction
		// Based on what modal we want to display
		dispatch(setModalDirection(direction));
	}, [direction, authState]);

	const getProfileModalContents = () => {
		// Not logged in
		if (authState && authState.userId !== null) {
			return (
				<div className='flex flex-col items-center w-full h-full'>
					<div className='mt-12 w-1/2 aspect-auto flex justify-center'>
						<img
							className='object-cover'
							src={snoo}
						/>
					</div>
					<p className='mt-8 w-full text-gray-300 text-sm text-center'>
						Looks like you're not signed in
					</p>
					<button
						onClick={() => navigate('/sign_in')}
						className='mt-6 bg-blue-500 text-gray-300 w-2/3 h-12 rounded-full'
					>
						Sign in
					</button>
					<p className='mt-10 text-gray-300 text-xs'>Don't have an account?</p>
					<button
						onClick={() => navigate('/signup')}
						className='text-center text-xs mt-4 bg-orange-600 text-gray-300 w-2/3 h-8 rounded-full'
					>
						Sign up
					</button>
				</div>
			);
		} else {
			/* console.log('User is logged in'); */
		}
	};

	// Display correct contents based on if user is logged in
	const modalContent = React.useMemo(
		() => getProfileModalContents(),
		[authState]
	);

	/* console.log('Latest modal content', modalContent); */

	return <PopoutModal modal={modal}>{modalContent}</PopoutModal>;
}

export default ProfileModal;
