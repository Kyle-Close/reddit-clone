const initialState = {
	direction: '',
	isOpen: false,
	type: '',
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

export function setType(type) {
	return {
		type: 'SET_TYPE',
		payload: type,
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
		case 'SET_TYPE':
			return {
				...state,
				type: action.payload,
			};
		default:
			return state;
	}
}
