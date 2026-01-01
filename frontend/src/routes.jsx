import App from "./App.jsx"

import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Auth from "./templates/auth.jsx"
import Blog from "./templates/blog.jsx"
import Home from "./pages/home.jsx"
import Post from "./pages/post.jsx"
import Create from "./pages/create.jsx"

const routes = [
    {
        path: 'app',
        element: <App/>,
        children: [

        ]
    },
    {
        path: 'auth',
        element: <Auth/>,
        children: [
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'signup',
                element: <Signup/>,
            }
        ]
    },
    {
        path: 'blog',
        element: <Blog/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: ':postid',
                element: <Post/>
            }, 
            {
                path: 'create',
                element: <Create/>
            }

        ]
    }
]
export default routes
