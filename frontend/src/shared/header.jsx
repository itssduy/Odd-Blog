import { Link, useNavigate } from "react-router"

const Header = ()=>{
    const navigate = useNavigate();

    const signOut = ()=>{
        localStorage.removeItem('blog-token');
        navigate('/auth/login');
    }
    return (
        <>
            <ul>
                <li><Link to=''>Home</Link></li>
                <li><button onClick={signOut}>Signout</button></li>
            </ul>
        </>
    )
}

export default Header