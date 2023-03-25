import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";
import "./addNote.css";

const AddNote = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        description: "",
        onTime: ""
    })
    const submitHandler = (e) => {
        e.preventDefault();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        data.onTime = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString()}`;
        axios.post("https://node-taker-app-backend.onrender.com/notes/add", data, {withCredentials:true}).then(response=>{
            if(response.data.msg==="Note Added Successfully"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.data.msg,
                    timer: 500,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/home");
                })
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response.data.msg,
                    timer: 500,
                    timerProgressBar: true,
                })
            }
        })        
    }
    return <section>
    <NavBar />
    <div id="addPage">
    <form method="POST" onSubmit={submitHandler}>
            <h1>Add Note</h1>
                <label>Title</label>
                <input placeholder="Title" type="text" value={data.title} onChange={(e)=>{setData({...data, title: e.target.value})}} required />

                <label>Description</label>
                <div id="desc" contentEditable={true}
                value={data.description}
                onKeyDown={(e)=>{setData({...data, description:e.target.innerText});console.log(e.target.innerText)}}>
                </div>
           <div>
                <button type="submit">Add</button>
            </div>
    </form>
    </div>
    </section>
}

export default AddNote;