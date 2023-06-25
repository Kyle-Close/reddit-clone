import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import SignUpPage from './components/profile-modal/SignUpPage';
import SignInPage from './components/profile-modal/SignInPage';
import CreateSubreddit from './components/subreddit-page/CreateSubreddit';
import Subreddit from './components/subreddit-page/Subreddit';
import CreatePost from './components/subreddit-page/CreatePost';
import Post from './components/post-page/Post';
import CommentPage from './components/post-page/CommentPage';
import ReplyPage from './components/post-page/ReplyPage';

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
		element: <Post />,
	},
	{
		path: '/r/:subredditName/:postId/comment',
		element: <CommentPage />,
	},
	{
		path: '/reply/:commentId',
		element: <ReplyPage />,
	},
]);
