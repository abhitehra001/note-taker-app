import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";
import "./updateNote.css";

const UpdateNote = ({noteId}) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        description: "",
        onTime: ""
    })
    useEffect(()=>{
        axios.get(`http://localhost:8000/notes/one/${noteId}`, { withCredentials:true }).then(response=>{
            console.log(response.data);
            setData({
                title: response.data.title,
                description: response.data.description
            });
            document.getElementById("desc").innerText = response.data.description;
        })
    },[])
    const submitHandler = (e) => {
        e.preventDefault();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        data.onTime = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString()}`;
        axios.post(`http://localhost:8000/notes/${noteId}`, data, {withCredentials:true}).then(response=>{
            if(response.data.msg==="Note Updated Successfully"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.data.msg,
                    timer: 500,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/home");
                })
            }
        })        
    }
    return <section>
    <NavBar />
    <div id="updatePage">
    <form method="POST" onSubmit={submitHandler}>
            <h1>Update Note</h1>
                <label>Title</label>
                <input placeholder="Title" type="text" value={data.title} onChange={(e)=>{setData({...data, title: e.target.value})}} required />

                <label>Description</label>
                <div id="desc" contentEditable={true}
                onKeyDown={(e)=>{setData({...data, description:e.target.innerText});console.log(e.target.innerText)}}>
                </div>
            <div>
                <button type="submit">Update</button>
                <button onClick={()=>{
                    axios.get(`http://localhost:8000/notes/delete/${noteId}`, { withCredentials: true }).then((response) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Deleted Successfully",
                            timer: 500,
                            timerProgressBar: true,
                        }).then(() => {
                            navigate("/home");
                        })
                    })
                }}>Delete</button>
            </div>
    </form>
    </div>
    </section>
}

export default UpdateNote;