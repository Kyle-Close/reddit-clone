import React from 'react';
import { useNavigate } from 'react-router';
import { signInUser } from '../../auth';
import { auth } from '../../firebase';

import Header from '../header/Header';
import BackButton from '../header/BackButton';

function SignInPage() {
	const navigate = useNavigate();
	const [signInFormData, setSignInFormData] = React.useState({
		email: '',
		password: '',
	});
	const [signInErrorMessage, setSignInErrorMessage] = React.useState(null);

	function handleFormChange(e) {
		const inputType = e.target.type;
		let propertyToUpdate;
		switch (inputType) {
			case 'email':
				propertyToUpdate = 'email';
				break;
			case 'password':
				propertyToUpdate = 'password';
				break;
			default:
		}
		setSignInFormData((prevSignupFormData) => {
			return {
				...prevSignupFormData,
				[propertyToUpdate]: e.target.value,
			};
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const isSuccess = await signInUser(
			auth,
			signInFormData.email,
			signInFormData.password
		);
		if (isSuccess) {
			navigate('/');
		} else {
			// Unsucessful login
			setSignInErrorMessage('Invalid email/password.');
		}
	}

	React.useEffect(() => {}, [signInFormData]);

	return (
		<div className='flex flex-col h-screen bg-black'>
			<Header justify='justify-between'>
				<BackButton destination={-1} />
			</Header>
			<div className='bg-zinc-700 grow mx-4 my-6 rounded-md text-gray-200'>
				<form
					onSubmit={handleSubmit}
					className='grid gap-4 m-8'
				>
					<div className='grid gap-2'>
						<label>Email</label>
						<input
							type='email'
							onChange={handleFormChange}
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-100'
							placeholder='username'
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
					{signInErrorMessage && (
						<p className='text-red-400'>{signInErrorMessage}</p>
					)}
					<button className='w-1/2 mt-6 bg-teal-700 py-3 rounded-full justify-self-center text-center'>
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignInPage;
