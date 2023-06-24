import React from 'react';
import { useSelector } from 'react-redux';

import snooLoggedIn from '../../img/snoo-logged-in.png';
import karma from '../../img/karma.svg';
import cake from '../../img/cake.svg';

import { logout } from '../../auth';
import { auth } from '../../firebase';
import {userService} from '../../firebase';

function ProfileLoggedIn() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [userName, setUserName] = React.useState(null);
	const [userKarma, setUserKarma] = React.useState(null);
	const [userCreatedAt, setUserCreatedAt] = React.useState(null);

	const authState = useSelector((state) => state.authState);

	async function populateProfileFromDB() {
		setIsLoading(true);
		const user = await userService.getUserById(authState.userId);
		const { userName, karma, createdAt } = user;
		setUserName(userName);
		setUserKarma(karma);
		setUserCreatedAt(createdAt);
		setIsLoading(false);
	}

	function handleSignOut() {
		logout(auth);
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

	React.useEffect(() => {
		populateProfileFromDB();
	}, []);

	return !isLoading ? (
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
	) : (
		<div>Loading...</div>
	);
}

export default ProfileLoggedIn;
