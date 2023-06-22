import React from 'react';
import { useParams } from 'react-router';

function Subreddit() {
	const { subredditName } = useParams();
	return <h1>{subredditName}</h1>;
}

export default Subreddit;
