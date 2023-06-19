import React from 'react';
import { useNavigate } from 'react-router';
import { createNewUser } from '../auth';
import { auth } from '../firebase';

import Header from './header/Header';
import BackButton from './header/BackButton';

function Signup() {
	const navigate = useNavigate();
	const [signupFormData, setSignupFormData] = React.useState({
		userName: '',
		email: '',
		password: '',
	});
	const [createUserErrorMessage, setCreateUserErrorMessage] =
		React.useState(null);

	function handleFormChange(e) {
		const inputType = e.target.type;
		let propertyToUpdate;
		switch (inputType) {
			case 'text':
				propertyToUpdate = 'userName';
				break;
			case 'email':
				propertyToUpdate = 'email';
				break;
			case 'password':
				propertyToUpdate = 'password';
				break;
			default:
				console.log(`Add input type ${inputType} to switch.`);
		}
		setSignupFormData((prevSignupFormData) => {
			return {
				...prevSignupFormData,
				[propertyToUpdate]: e.target.value,
			};
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const user = await createNewUser(
			auth,
			signupFormData.email,
			signupFormData.password
		);
		if (user !== true) {
			const errorMessage = getReadableErrorMessage(user);
			// createNewUser will have returned the error message on why we were not able to create the account
			setCreateUserErrorMessage(errorMessage);
		} else {
			setCreateUserErrorMessage(null);
			navigate('/');
		}
	}

	return (
		<div className='flex flex-col h-screen bg-black'>
			<Header>
				<BackButton />
			</Header>
			<div className='bg-zinc-700 grow mx-4 my-6 rounded-md text-gray-200'>
				<form
					onSubmit={handleSubmit}
					className='grid gap-4 m-8'
				>
					<div className='grid gap-2'>
						<label>Username</label>
						<input
							onChange={handleFormChange}
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-100'
							placeholder='username'
							required
						/>
					</div>
					<div className='grid gap-2'>
						<label>Email</label>
						<input
							onChange={handleFormChange}
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-100'
							placeholder='example@gmail.com'
							type='email'
							required
						/>
					</div>
					<div className='grid gap-2'>
						<label>Password</label>
						<input
							onChange={handleFormChange}
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-100'
							type='password'
							required
						/>
					</div>
					{createUserErrorMessage && (
						<p className='text-sm text-red-500'>{createUserErrorMessage}</p>
					)}

					<button className='w-1/2 mt-6 bg-orange-700 py-3 rounded-full justify-self-center text-center'>
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
}

function getReadableErrorMessage(errorMessage) {
	if (errorMessage.includes('email-already-in-use')) {
		return 'An account with this email already exists';
	}
	let result;
	// Remove "Firebase:" and (<Error-Code>)
	const regex = /:(.*?)\(/;
	const match = regex.exec(errorMessage);
	if (match) {
		result = match[1].trim();
	}
	return result;
}

export default Signup;
