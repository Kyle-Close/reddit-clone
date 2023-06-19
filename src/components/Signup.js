import React from 'react';

import Header from './header/Header';
import BackButton from './header/BackButton';

function Signup() {
	return (
		<div className='flex flex-col h-screen bg-black'>
			<Header>
				<BackButton />
			</Header>
			<div className='bg-zinc-700 grow mx-4 my-6 rounded-md text-gray-200'>
				<form className='grid gap-4 m-8'>
					<div className='grid gap-2'>
						<label>Username</label>
						<input
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-100'
							placeholder='username'
							required
						/>
					</div>
					<div className='grid gap-2'>
						<label>Email</label>
						<input
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-100'
							placeholder='example@gmail.com'
							type='email'
							required
						/>
					</div>
					<div className='grid gap-2'>
						<label>Password</label>
						<input
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-100'
							type='password'
							required
						/>
					</div>
					<button className='w-1/2 mt-6 bg-orange-700 py-3 rounded-full justify-self-center'>
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
