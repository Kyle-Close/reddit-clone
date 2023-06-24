import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIsOpen } from '../reducers/modal';

function PopoutModal({ children, modal }) {
	const { direction } = modal;
	const myModal = useRef(null);
	const classNames = getModalClassNames(direction).join(' ');
	const isOpen = useSelector((state) => state.modal.isOpen);
	const dispatch = useDispatch();

	function onClickOutside(event) {
		if (isOpen && myModal.current && !myModal.current.contains(event.target)) {
			dispatch(setIsOpen(false));
		}
	}

	useEffect(() => {
		// Attach the listeners on component mount
		document.addEventListener('click', onClickOutside);

		// Detach the listeners on component unmount
		return () => {
			document.removeEventListener('click', onClickOutside);
		};
	}, [isOpen]);

	return (
		<div
			ref={myModal}
			className={classNames}
		>
			{children}
		</div>
	);
}

function getModalClassNames(direction) {
	const classNames = [
		'flex',
		'flex-col',
		'bg-zinc-800',
		'absolute',
		'max-h-screen',
		'overflow-y-auto',
	];

	if (direction === 'left' || direction === 'right') {
		classNames.push('w-2/3');
		classNames.push('inset-y-0');
	}

	switch (direction) {
		case 'left':
			classNames.push('animate-slideInLeft');
			classNames.push('left-0');
			break;
		case 'right':
			classNames.push('animate-slideInRight');
			classNames.push('right-0');
			break;
		case 'bottom':
			classNames.push('animate-slideUp');
			classNames.push('h-40');
			classNames.push('inset-x-0');
			classNames.push('bottom-0');
			break;
	}

	return classNames;
}

export default PopoutModal;
