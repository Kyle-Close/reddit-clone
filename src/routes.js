import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import SignUpPage from './components/profile-modal/SignUpPage';
import SignInPage from './components/profile-modal/SignInPage';

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
