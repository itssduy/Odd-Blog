import { useState } from "react";


const Login = ()=>{
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');

    const onSubmit = async (e)=>{
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        }
        const url = `${import.meta.env.VITE_API_URL}/auth/login`
        const body = {
            username: getUsername,
            password: getPassword,
        }
        const response = await fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body)
        })

        
        const data = await response.json();
        localStorage.setItem("blog-token", data)
    }
    return (
        <>

            <form onSubmit={onSubmit}> 
                <input type="text" name="username" placeholder="Username" onChange={(x)=>{setUsername(x.target.value)}}/>
                <input type="password" name="password" placeholder="password" onChange={(x)=>{setPassword(x.target.value)}}/>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Login