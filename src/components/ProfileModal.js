import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import PopoutModal from '../components/PopoutModal';
import snooLoggedOut from '../img/snoo.png';
import snooLoggedIn from '../img/snoo-logged-in.png';
import karma from '../img/karma.svg';

import { useSelector, useDispatch } from 'react-redux';
import { setModalDirection } from '../reducers/modal';

import { logout } from '../auth';
import { auth } from '../firebase';

function ProfileModal({ direction }) {
	const navigate = useNavigate();
	const modal = useSelector((state) => state.modal);
	const authState = useSelector((state) => state.authState);
	const dispatch = useDispatch();
	const [modalContent, setModalContent] = useState(null);

	useEffect(() => {
		// Set the modal direction and isOpen property
		// There is only 1 modal state. We change it's direction
		// Based on what modal we want to display
		dispatch(setModalDirection(direction));
	}, [direction, authState]);

	const getProfileModalContents = () => {
		// Logged in
		if (authState && authState.userId !== null) {
			return (
				<div className='flex flex-col items-center w-full h-full'>
					<div className='mt-12 w-1/2 aspect-auto flex justify-center'>
						<img
							className='object-cover'
							src={snooLoggedOut}
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
						//onClick={() => navigate('/signup')}
						onClick={logout(auth)}
						className='text-center text-xs mt-4 bg-orange-600 text-gray-300 w-2/3 h-8 rounded-full'
					>
						Sign up
					</button>
				</div>
			);
		} else {
			console.log('Logged in...');
			return (
				<div className='w-full h-full flex flex-col items-center'>
					<div className='mt-8'>
						<img src={snooLoggedIn} />
					</div>
					<p className='mt-4 text-gray-200'>u/close55</p>
					<div className='mt-8 flex w-full px-4 text-gray-200'>
						<div className='grow flex gap-2'>
							<div className='w-12 aspect-auto'>
								<img src={karma} />
							</div>
							<div className='grow'>
								<h4>11</h4>
								<p>Karma</p>
							</div>
						</div>
						<div className='grow'>Reddit Age</div>
					</div>
				</div>
			);
		}
	};

	// Display correct contents based on if user is logged in
	React.useEffect(() => {
		console.log('Logged in');
		const modalContent = getProfileModalContents();
		setModalContent(modalContent);
	}, [authState]);

	/* console.log('Latest modal content', modalContent); */

	return (
		<PopoutModal modal={modal}>{modalContent && modalContent}</PopoutModal>
	);
}

export default ProfileModal;
