export function setUserId(userId) {
	return {
		type: 'SET_USER_ID',
		payload: userId,
	};
}

export default function authState(state = null, action) {
	switch (action.type) {
		case 'SET_USER_ID':
			return {
				...action.payload,
				userId: action.payload,
			};
		default:
			return state;
	}
}
