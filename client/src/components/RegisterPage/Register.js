import { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    axios.get("http://localhost:8000/check", { withCredentials:true }).then(response=>{
        if(response.data.msg==="User Authenticated"){
            navigate("/home");
        }
    })
    const submitHandler = (e) =>{
        e.preventDefault();
        if(data.email.includes("@") && data.password===data.confirmPassword){
            axios.post("http://localhost:8000/users/register", {
                email: data.email,
                password: data.password
            }).then(response=>{
                if(response.data.msg==="Registered Successfully"){
                    swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.data.msg,
                        timer: 500,
                        timerProgressBar: true,
                    }).then(()=>{
                        navigate("/");
                    })
                }else if(response.data.msg==="Email Already Registered"){
                    swal.fire({
                        position: "center",
                        icon: "info",
                        title: response.data.msg,
                        timer: 1000,
                        timerProgressBar: true
                    }).then(()=>{
                        navigate("/");
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
        }else if(data.password!==data.confirmPassword){
            swal.fire({
                position: "center",
                icon: "error",
                title: "Password not Matching",
                timer: 2000,
                timerProgressBar: true
            })
        }else{
            swal.fire({
                position: "center",
                icon: "error",
                title: "Invalid Email",
                timer: 2000,
                timerProgressBar: true
            })
        }
    }
    return <section id="registerPage">
        <form method="POST" onSubmit={submitHandler} >       
            <h1>Register</h1>
                <label>Email</label>
                <input placeholder="Email" type="text" value={data.email} onChange={(e)=>{setData({...data, email: e.target.value})}} required />

                <label>Password</label>
                <input placeholder="Password" type="password" value={data.password} onChange={(e)=>{setData({...data, password: e.target.value})}} required />

                <label>Confirm Password</label>
                <input placeholder="Confirm Password" type="password" value={data.confirmPassword} onChange={(e)=>{setData({...data, confirmPassword: e.target.value})}} required />
            <div id="checkInput">
                <input id="inputCheckbox" type="checkbox" required />
                I agree to all TERMS AND CONDITINS
            </div>
            <div>
                <button type="submit">Register</button>
                <button onClick={()=>{navigate("/")}}>LogIn</button>
            </div>
        </form>
    </section>
}

export default Register;