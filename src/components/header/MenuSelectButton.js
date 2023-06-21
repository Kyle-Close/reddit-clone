import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setModalDirection, setType } from '../../reducers/modal';

import MenuExpand from '../../img/Menu-Expand.png';

function MenuSelectButton() {
	const dispatch = useDispatch();
	function handleButtonClick(e) {
		e.stopPropagation();
		dispatch(setType('menu'));
		dispatch(setModalDirection('left'));
		dispatch(setIsOpen(true));
	}
	return (
		<button onClick={handleButtonClick}>
			<img src={MenuExpand} />
		</button>
	);
}

export default MenuSelectButton;
