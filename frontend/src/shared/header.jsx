import { Link } from "react-router"

const Header = ()=>{

    return (
        <>
            <ul>
                <li><Link to=''>Home</Link></li>
                <li><Link to=''>Signout</Link></li>
            </ul>
        </>
    )
}

export default Header