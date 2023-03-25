import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./home.css";

const Home = ({setNoteId}) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const retreiveData = () => {
        axios.get("https://node-taker-app-backend.onrender.com/notes/all", {withCredentials:true}).then((response)=>{
            setData(response.data);
        })
    }
    useEffect(()=>{
        retreiveData();
    },[]);
    const [search,setSearch] = useState("");
    return <section id="homePage">
    <NavBar />
    <div id="homePageContainer">
    <div id="searchContainer">
    <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search" />
    <img src="/images/search.png" alt="searchLogo" />
    </div>
    <section id="notesContainer">
    {
        data.length ? data.map((notes, index)=>{
            if(search.length===0 || notes.title.includes(search)){
            return <div key={index} className="notes" onClick={()=>{
                setNoteId(notes._id);
                navigate("/update");
            }}>
            <div className="time">{notes.onTime}</div>
            <div className="title">{notes.title}</div>
            <div className="description">{notes.description}</div>
            </div>
            }
        }) : <p>No Notes Yet</p>
    }
    </section>
    </div>
    </section>
}

export default Home;