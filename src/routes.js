import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import SignUpPage from './components/profile-modal/SignUpPage';
import SignInPage from './components/profile-modal/SignInPage';
import CreateSubreddit from './components/subreddit-page/CreateSubreddit';
import Subreddit from './components/subreddit-page/Subreddit';
import CreatePost from './components/subreddit-page/CreatePost';

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
	{
		path: '/create_subreddit',
		element: <CreateSubreddit />,
	},
	{
		path: '/r/:subredditName',
		element: <Subreddit />,
	},
	{
		path: '/r/:subredditName/create_post',
		element: <CreatePost />,
	},
	{
		path: '/r/:subredditName/:postId',
		element: <div>Post</div>,
	},
]);
