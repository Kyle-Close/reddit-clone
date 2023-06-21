import React, { useEffect } from 'react';

import PopoutModal from '../PopoutModal';
import MenuLoggedIn from './MenuLoggedIn';

import { useSelector, useDispatch } from 'react-redux';
import { setModalDirection } from '../../reducers/modal';

function MenuModal({ direction }) {
	const modal = useSelector((state) => state.modal);
	const authState = useSelector((state) => state.authState);
	const dispatch = useDispatch();

	useEffect(() => {
		// Set the modal direction and isOpen property. There is only 1 modal state. We change it's direction based on what modal we want to display
		dispatch(setModalDirection(direction));
	}, [direction, authState]);

	return (
		<PopoutModal modal={modal}>
			<MenuLoggedIn />
		</PopoutModal>
	);
}

export default MenuModal;
