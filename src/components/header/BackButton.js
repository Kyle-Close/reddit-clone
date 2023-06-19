import React from 'react';
import backIcon from '../../img/Back Icon.png';
import { useNavigate } from 'react-router';

function BackButton() {
	const navigate = useNavigate();
	function handleClick() {
		navigate(-1);
	}
	return (
		<button onClick={handleClick}>
			<img src={backIcon} />
		</button>
	);
}

export default BackButton;
