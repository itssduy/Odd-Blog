import App from "./App.jsx"

import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Auth from "./pages/auth.jsx"

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
]
export default routes
