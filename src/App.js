import React from 'react';
import Header from './components/header/Header';

import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './reducers/authState';
import { auth } from './firebase';
import { monitorAuthState } from './auth';

import ProfileModal from './components/profile-modal/ProfileModal';
import MenuSelectButton from './components/header/MenuSelectButton';
import ProfileIcon from './components/header/ProfileIcon';
import MenuModal from './components/menu-modal/MenuModal';

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

	function renderModal() {
		switch (modal.type) {
			case 'profile':
				return <ProfileModal direction='right' />;
			case 'menu':
				return <MenuModal direction='left' />;
			default:
				return null;
		}
	}

	return (
		<div>
			<Header>
				<MenuSelectButton />
				<ProfileIcon />
			</Header>
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default App;
