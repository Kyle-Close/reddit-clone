import React from 'react';
import Header from './components/header/Header';

import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './reducers/authState';

import ProfileModal from './components/profile-modal/ProfileModal';
import MenuSelectButton from './components/header/MenuSelectButton';
import ProfileIcon from './components/header/ProfileIcon';
import MenuModal from './components/menu-modal/MenuModal';

function App() {
	const modal = useSelector((state) => state.modal);

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
			<Header justify='justify-between'>
				<MenuSelectButton />
				<ProfileIcon />
			</Header>
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default App;
