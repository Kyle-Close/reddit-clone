import React from 'react';
import { useNavigate } from 'react-router';

import snooLoggedOut from '../../img/snoo.png';

function ProfileLoggedOut() {
	const navigate = useNavigate();
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
}

export default ProfileLoggedOut;
