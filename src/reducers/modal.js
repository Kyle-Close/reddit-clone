const initialState = {
    direction: 'left',
    coverage: 1 // 0 = 1/2, 1 = 1/3
}

export function setModalDirection(direction) {
	return {
		type: 'SET_MODAL_DIRECTION',
        payload: direction
	};
}

export function setModalCoverage(percentage){
    return {
        type: 'SET_MODAL_COVERAGE',
        payload: percentage
    }
}

export default function modal(state = initialState, action) {
	switch (action.type) {
		case 'SET_MODAL_DIRECTION':
			return {
                ...state,
                direction: action.payload
            }
            case 'SET_MODAL_DIRECTION':
                return {
                    ...state,
                    coverage: action.payload
                }
		default:
			return state;
	}
}
