import React, { useEffect } from 'react';

import PopoutModal from '../PopoutModal';
import ProfileLoggedOut from './ProfileLoggedOut';
import ProfileLoggedIn from './ProfileLoggedIn';

import { useSelector, useDispatch } from 'react-redux';
import { setIsOpen } from '../../reducers/modal';

function ProfileModal({ direction }) {
	const modal = useSelector((state) => state.modal);
	const authState = useSelector((state) => state.authState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIsOpen(true));
	}, [direction, authState, dispatch]);

	return (
		<PopoutModal modal={modal}>
			{authState.userId === null ? <ProfileLoggedOut /> : <ProfileLoggedIn />}
		</PopoutModal>
	);
}

export default ProfileModal;
