/* import { useSelector } from 'react-redux';

export function useModal(startDirection, percentCoverage) {
	const modalState = useSelector((state) => state.modal);
	return modalState;
}

import { useSelector, useDispatch } from 'react-redux';
import { setModalDirection } from '../reducers/modal';

export function useModal(startDirection) {
	const modalState = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	const setDirection = (startDirection) => {
		dispatch(setModalDirection(startDirection));
	};

	if (startDirection) setDirection(startDirection);

	return modalState;
} */
