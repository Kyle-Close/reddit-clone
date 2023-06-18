const initialState = {
    direction: 'bottom',
}

export function setModalDirection(direction) {
	return {
		type: 'SET_MODAL_DIRECTION',
        payload: direction
	};
}


export default function modal(state = initialState, action) {
	switch (action.type) {
		case 'SET_MODAL_DIRECTION':
			return {
                ...state,
                direction: action.payload
            }
		default:
			return state;
	}
}
