import React from 'react';
import backIcon from '../../img/Back Icon.png';
import { useNavigate } from 'react-router';

function BackButton({ destination }) {
	const navigate = useNavigate();
	function handleClick() {
		navigate(destination);
	}
	return (
		<button onClick={handleClick}>
			<img src={backIcon} />
		</button>
	);
}

export default BackButton;
