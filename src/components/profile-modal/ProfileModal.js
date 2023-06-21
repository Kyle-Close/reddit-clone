import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import PopoutModal from '../PopoutModal';
import snooLoggedOut from '../../img/snoo.png';
import snooLoggedIn from '../../img/snoo-logged-in.png';
import karma from '../../img/karma.svg';
import cake from '../../img/cake.svg';

import { useSelector, useDispatch } from 'react-redux';
import { setModalDirection } from '../../reducers/modal';

import { logout } from '../../auth';
import { auth } from '../../firebase';
import { getUserById } from '../../firebase';

function ProfileModal({ direction }) {
	const navigate = useNavigate();
	const modal = useSelector((state) => state.modal);
	const authState = useSelector((state) => state.authState);
	const dispatch = useDispatch();
	const [modalContent, setModalContent] = useState(null);

	// Profile states
	const [userName, setUserName] = useState(null);
	const [userKarma, setUserKarma] = useState(null);
	const [userCreatedAt, setUserCreatedAt] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (authState && authState.userId) populateProfileFromDB();
	}, []);

	useEffect(() => {
		// Set the modal direction and isOpen property
		// There is only 1 modal state. We change it's direction
		// Based on what modal we want to display

		dispatch(setModalDirection(direction));
	}, [direction, authState]);

	useEffect(() => {
		if (authState && authState.userId) {
			populateProfileFromDB();
		} else {
			console.log('Signed out...');
		}
		/* 		const user = getUserById(authState.userId);
		console.log(user); */
	}, [authState]);

	async function populateProfileFromDB() {
		setIsLoading(true);
		const user = await getUserById(authState.userId);
		const { userName, karma, createdAt } = user;
		setUserName(userName);
		setUserKarma(karma);
		setUserCreatedAt(createdAt);
		setIsLoading(false);
	}

	function getProfileModalContents() {
		// Logged in

		if (authState.userId === null) {
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
						onClick={() => navigate('/signup')}
						className='text-center text-xs mt-4 bg-orange-600 text-gray-300 w-2/3 h-8 rounded-full'
					>
						Sign up
					</button>
				</div>
			);
		} else {
			if (isLoading) {
				return <div>Loading...</div>;
			} else {
				return (
					<div className='w-full h-full flex flex-col items-center'>
						<div className='mt-8'>
							<img src={snooLoggedIn} />
						</div>
						<p className='mt-4 text-gray-200'>u/{userName}</p>
						<div className='mt-8 flex w-full px-4 text-gray-200 gap-8 justify-center'>
							<div className='flex gap-4'>
								<div className='w-10 aspect-auto'>
									<img src={karma} />
								</div>
								<div className='grow'>
									<h4>{userKarma}</h4>
									<p className='text-xs text-gray-300'>Karma</p>
								</div>
							</div>
							<div className='flex gap-3'>
								<div className='w-12 aspect-auto'>
									<img src={cake} />
								</div>
								<div className='flex flex-col'>
									<h4>
										{daysSince(new Date(Number(userCreatedAt)))}
										<span className='text-xs text-yellow-400 ml-1'>d</span>
									</h4>
									<p className='text-xs'>Reddit age</p>
								</div>
							</div>
						</div>
						<div className='pb-10 w-full grow flex items-end justify-center'>
							<button
								onClick={handleSignOut}
								className='font-bold bg-red-600 py-2 px-4 rounded-full text-red-100 w-32'
							>
								Sign out
							</button>
						</div>
					</div>
				);
			}
		}
	}

	function handleSignOut() {
		logout(auth);
	}

	// Display correct contents based on if user is logged in
	React.useEffect(() => {
		const modalContent = getProfileModalContents();
		setModalContent(modalContent);
	}, [authState, isLoading]);

	/*  */

	return (
		<PopoutModal modal={modal}>{modalContent && modalContent}</PopoutModal>
	);
}

function daysSince(date) {
	// Get the current date
	let now = new Date();
	// Get the time difference in milliseconds
	let timeDiff = now - date;
	// Convert the time difference from milliseconds to days
	let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	return daysDiff.toString();
}

export default ProfileModal;
