import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';

export default createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/signup',
		element: <SignUpPage />,
	},
	{
		path: '/sign_in',
		element: <SignInPage />,
	},
]);
