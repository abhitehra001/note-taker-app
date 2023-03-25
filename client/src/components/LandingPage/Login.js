import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const checkLogIn = () => {
        axios.get("https://node-taker-app-backend.onrender.com/check", { withCredentials:true }).then(response=>{
            console.log(response.data);
            if(response.data.msg==="User Authenticated"){
                navigate("/home");
            }
        })
    }
    useEffect(checkLogIn,[]);

    const submitHandler = (e) =>{
        e.preventDefault();
        if(data.email.includes("@")){
            axios.post("https://node-taker-app-backend.onrender.com/users/login", data, {withCredentials:true}).then(response=>{
                if(response.data.msg==="LoggedIn Successfully"){
                    swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.data.msg,
                        timer: 500,
                        timerProgressBar: true,
                    }).then(()=>{
                        navigate("/home");
                    })
                }else if(response.data.msg==="Email not Registered"){
                    swal.fire({
                        position: "center",
                        icon: "info",
                        title: response.data.msg,
                        timer: 1000,
                        timerProgressBar: true
                    }).then(()=>{
                        navigate("/register");
                    })
                }else {
                    swal.fire({
                        position: "center",
                        icon: "error",
                        title: response.data.msg,
                        timer: 1000,
                        timerProgressBar: true
                    })
                }
            })
        }else{
            swal.fire({
                position: "center",
                icon: "error",
                title: "Invalid Email",
                timer: 1000,
                timerProgressBar: true
            })
        }
    }
    return <section id="landingPage">
        <form method="POST" onSubmit={submitHandler} >       
                <h1>Sign In</h1>
                <label>Email</label>
                <input placeholder="Email" type="text" value={data.email} onChange={(e)=>{setData({...data, email: e.target.value})}} required />

                <label>Password</label>
                <input placeholder="Password" type="password" value={data.password} onChange={(e)=>{setData({...data, password: e.target.value})}} required />
            <div>
                <button type="submit">LogIn</button>
                <button onClick={()=>{navigate("/register")}}>Register</button>
            </div>
        </form>
    </section>
}

export default Login;