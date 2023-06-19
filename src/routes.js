import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import Signup from './components/Signup';

export default createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
]);
