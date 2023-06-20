import React from 'react';
import Header from './components/header/Header';

import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './reducers/authState';
import { auth } from './firebase';
import { monitorAuthState } from './auth';

import ProfileModal from './components/ProfileModal';
import BackButton from './components/header/BackButton';
import ProfileIcon from './components/ProfileIcon';

function App() {
	const modal = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	React.useEffect(() => {
		// Set user ID in state. Use this for grabbing data later
		const callback = (user) => {
			if (user) dispatch(setUserId(user.uid));
			else dispatch(setUserId(null));
		};
		// Initialize authentication state monitoring
		monitorAuthState(auth, callback);
	}, []);

	return (
		<div>
			<Header>
				<BackButton />
				<ProfileIcon />
			</Header>
			{modal.isOpen && <ProfileModal direction='right' />}
		</div>
	);
}

export default App;
