import React from 'react';

function PopoutModal({ children, modal }) {
	const { direction } = modal;
	const classNames = getModalClassNames(direction).join(' ');

	return <div className={classNames}>{children}</div>;
}

function getModalClassNames(direction) {
	const classNames = ['flex', 'flex-col', 'bg-zinc-800', 'absolute'];

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
