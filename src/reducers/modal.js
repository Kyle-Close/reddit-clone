const initialState = {
	direction: 'right',
	isOpen: false,
};

export function setModalDirection(direction) {
	return {
		type: 'SET_MODAL_DIRECTION',
		payload: direction,
	};
}

export function setIsOpen(value) {
	return {
		type: 'SET_IS_OPEN',
		payload: value,
	};
}

export default function modal(state = initialState, action) {
	switch (action.type) {
		case 'SET_MODAL_DIRECTION':
			return {
				...state,
				direction: action.payload,
			};
		case 'SET_IS_OPEN':
			return {
				...state,
				isOpen: action.payload,
			};
		default:
			return state;
	}
}
