import { Outlet } from "react-router"
import Header from "../shared/header"
Outlet

const Blog = ()=>{

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Blog